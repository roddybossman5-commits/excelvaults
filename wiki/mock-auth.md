# Mock Auth & Account View

Covers issues 5–6 from `Inbox/Raw Prompt Thoughts`.

## Seeding Credentials `✅ VERIFIED`

There is no excelvaults backend in this replica. Logins are matched against a JSON
seed file. Adding an account means appending one object to `users` — no code change:

```json
{
  "id": "someone",
  "username": "...",
  "password": "...",
  "profile": {
    "firstName": "", "lastName": "", "item": "", "dateOfDeposit": "",
    "phoneNumber": "", "serialNumber": "", "country": "",
    "nextOfKin": "", "notice": ""
  }
}
```

`src/GLOBAL/redux/mockAuthService.js` resolves after a 300 ms simulated latency, so
loading states are actually exercisable.

## Two Seed Files `✅ VERIFIED`

| File | Committed? | Purpose |
|------|-----------|---------|
| `src/mocks/seedUsers.local.json` | **No — gitignored** | Real credentials. What Playwright uses. |
| `src/mocks/seedUsers.example.json` | Yes | Dummy template and runtime fallback. |

`mockAuthService` prefers the local file and falls back to the example, so a fresh
clone still builds and runs — it just cannot log in until someone supplies the local
file. To set up: copy the example, rename it to `seedUsers.local.json`, fill in real
values.

**Why this split:** `roddybossman5-commits/excelvaults` is a **public** repo, and the
working credential is a real live-site login, not a fixture. Committing it would
publish it permanently — git history keeps a secret even after the file is deleted.

Never move real credentials into the example file, and never remove the `.gitignore`
entry.

## Session Persistence `✅ VERIFIED`

`authSlice` writes the resolved profile to `localStorage` under
`excelvaults.session` and restores it on store creation, so a reload keeps you
logged in. `logout()` clears it.

## Account View `✅ VERIFIED`

`/account`, guarded — logged-out visitors are redirected to `/tracking`.

The live site renders a different set of fields after login (see
`Screenshots/Pasted image 20260730210048.png` in the vault). The replica shows these
instead, per issue 5:

Row order and labels are taken from the screenshot. Values marked **replaced** are
the ones circled in it, swapped for the figures in `Inbox/2026-07-30-Excel Vaults Dump`;
the rest are carried over from the screenshot unchanged.

| Label | Field key | Value | |
|-------|-----------|-------|---|
| First Name | `firstName` | Richard | replaced |
| Last Name | `lastName` | Larrison | replaced |
| Item | `item` | 100 KG Of Gold | |
| Date Of Deposit | `dateOfDeposit` | 02/04/2001 | |
| Phone Number | `phoneNumber` | +447405502595 | replaced |
| Serial Number | `serialNumber` | EX89303034 | |
| Country | `country` | United Kingdom | |
| Next Of Kin | `nextOfKin` | Caroline Larrison | replaced |
| Notice | `notice` | Balance due 11820 pound sterling | replaced |

Each `<td>` carries `data-field="<key>"` for stable Playwright selectors.

## Login Portal `✅ VERIFIED`

The Tracking nav item on the live site points off-domain to
`https://account.excelvaults.com` — a separate, non-WordPress app. `/tracking`
replicates its layout: 5/7 split, dark cover panel reading "Welcome to Excel
Vaults.", sign-in form on the right, and the error text "Wrong Username Or
Password".

Two quirks reproduced deliberately: the username field's placeholder is misspelled
**"Userame"** on the live portal, and the form is username+password only — no
second step. `✅ VERIFIED` (from the portal's served markup)

## Open Items `❓ NEEDS-CLARIFICATION`

- The vault note says "next of king" — read as **next of kin**, matching the
  screenshot's "Next Of Kin" label. Confirm.
- The dump gives the balance as "11820 pounds sterling"; the screenshot's notice
  reads "Balance due 12800 pound sterling". The replica uses the dump's figure with
  the screenshot's wording. Confirm that is the intent.
