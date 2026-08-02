/**
 * Mock authentication — issue 6 from Inbox/Raw Prompt Thoughts. There is no real
 * excelvaults backend in this replica; adding a credential means adding one object
 * to the seed file.
 *
 * Seeds come from `seedUsers.local.json`, which is gitignored because it holds real
 * live-site credentials. `seedUsers.example.json` is the committed template and the
 * fallback, so a fresh clone still builds and runs — it just cannot log in until
 * someone supplies the local file. See wiki/mock-auth.md.
 */
import exampleSeed from '../../mocks/seedUsers.example.json';

let seed = exampleSeed;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  seed = require('../../mocks/seedUsers.local.json');
  console.log('[mockAuth] using local seed file');
} catch (err) {
  console.warn('[mockAuth] no seedUsers.local.json found, falling back to example seeds');
}

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
