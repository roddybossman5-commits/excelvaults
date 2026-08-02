import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { login } from '../../redux/slice/authSlice';
import { SITE } from '../../../content/siteData';
import './TrackingPage.scss';

/**
 * The Tracking nav item — issue 2 in Inbox/Raw Prompt Thoughts.
 *
 * On the live site this link points off-domain to account.excelvaults.com, a
 * separate login portal, and it is unreachable on desktop because the nav is
 * mobile-only. This page replicates that portal's split-screen layout: cover panel
 * on the left, sign-in form on the right.
 *
 * Credentials are matched against the seed file — see wiki/mock-auth.md.
 */
export default function TrackingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  console.log('[TrackingPage] rendering login portal:', { authenticated: Boolean(user) });

  if (user) {
    return <Navigate to="/account" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('[TrackingPage] submitting login for:', form.username);

    const result = await dispatch(login(form));
    if (login.fulfilled.match(result)) {
      console.log('[TrackingPage] login succeeded, navigating to /account');
      navigate('/account');
    } else {
      console.error('[TrackingPage] login failed:', result.payload);
    }
  };

  return (
    <div className="portal">
      <aside
        className="portal__cover"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/portal-bg.jpg)`,
        }}
      >
        <div className="portal__cover-inner">
          <h1>
            Welcome
            <br />
            to
            <br />
            {SITE.name}.
          </h1>
        </div>
      </aside>

      <div className="portal__form-wrap">
        <div className="portal__form">
          <img
            className="portal__logo"
            src={`${process.env.PUBLIC_URL}/images/portal-logo.jpg`}
            alt="Excel Vaults"
            height="80"
          />

          <p className="portal__lead">Sign in to your account.</p>

          <form onSubmit={handleSubmit}>
            <input
              className="field"
              name="username"
              placeholder="Userame"
              aria-label="Username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
            />

            <div className="portal__password">
              <input
                className="field"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                aria-label="Password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="portal__eye"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((shown) => !shown)}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>

            <button className="button portal__submit" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Login'}
            </button>

            {error && (
              <div className="portal__error" role="alert">
                Wrong Username Or Password
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
