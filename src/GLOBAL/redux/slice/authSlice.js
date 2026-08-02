import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticate } from '../mockAuthService';

const STORAGE_KEY = 'excelvaults.session';

function restoreSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    console.log('[authSlice] restored session:', { found: Boolean(parsed) });
    return parsed;
  } catch (err) {
    console.error('[authSlice] failed to restore session:', { error: err.message });
    return null;
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await authenticate(credentials);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: restoreSession(),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      console.log('[authSlice] logout');
      window.localStorage.removeItem(STORAGE_KEY);
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
