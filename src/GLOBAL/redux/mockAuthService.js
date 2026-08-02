/**
 * Mock authentication — issue 6 from Inbox/Raw Prompt Thoughts. There is no real
 * excelvaults backend in this replica; adding a credential means adding one object
 * to `seedUsers.json`, no code change.
 *
 * NOTE: this is client-side auth, so the seed file is compiled into the public
 * bundle and its credentials are readable by anyone who opens DevTools on the
 * deployed site. That is inherent to a mock login, not a bug — it was an explicit
 * decision to ship working credentials so the deployed demo is usable.
 * See wiki/mock-auth.md.
 */
import seed from '../../mocks/seedUsers.json';

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
