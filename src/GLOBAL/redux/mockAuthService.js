/**
 * Mock authentication — issue 6 from Inbox/Raw Prompt Thoughts. There is no real
 * excelvaults backend in this replica; adding a credential means adding one object
 * to the seed file.
 *
 * Seeds come from `seedUsers.local.json` when it is present, otherwise from the
 * committed `seedUsers.example.json`. The local file holds real live-site
 * credentials, so it is excluded from both git (.gitignore) and Vercel uploads
 * (.vercelignore) — deployed builds get the dummy example seeds only.
 *
 * `require.context` rather than a plain `require`: webpack resolves imports
 * statically, so a bare `require('./seedUsers.local.json')` inside a try/catch
 * still fails the BUILD when the file is absent. require.context globs over
 * whatever actually exists at build time, so a missing local file is a non-event.
 *
 * See wiki/mock-auth.md.
 */
import exampleSeed from '../../mocks/seedUsers.example.json';

function loadSeed() {
  try {
    const ctx = require.context('../../mocks', false, /seedUsers\.local\.json$/);
    const key = ctx.keys()[0];

    if (key) {
      console.log('[mockAuth] using local seed file');
      return ctx(key);
    }
  } catch (err) {
    console.warn('[mockAuth] local seed lookup failed:', err.message);
  }

  console.warn('[mockAuth] no local seed file, using example seeds (dummy credentials)');
  return exampleSeed;
}

const seed = loadSeed();

const LATENCY_MS = 300;

export function listSeededUsernames() {
  return seed.users.map((u) => u.username);
}

export function authenticate({ username, password }) {
  console.log('[mockAuth] login attempt:', { username, seeded: seed.users.length });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = seed.users.find(
        (u) => u.username === username && u.password === password
      );

      if (!match) {
        console.error('[mockAuth] no seed entry matched:', { username });
        reject(new Error('Invalid username or password'));
        return;
      }

      console.log('[mockAuth] authenticated:', { id: match.id });
      resolve({ id: match.id, username: match.username, ...match.profile });
    }, LATENCY_MS);
  });
}
