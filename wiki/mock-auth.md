# Mock Auth & Account View

Covers issues 5–6 from `Inbox/Raw Prompt Thoughts`.

## Seeding Credentials `✅ VERIFIED`

There is no excelvaults backend in this replica. Logins are matched against
`src/mocks/seedUsers.json`. Adding an account means appending one object to `users` —
no code change:

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

## Credentials Are Public — By Decision `⚠️`

`seedUsers.json` is **committed**, and the repo and deployment are **public**.

This is deliberate. Auth here is entirely client-side, so the seed file is compiled
into the bundle — anyone can read the credentials from DevTools on the deployed site.
That is true of *any* credential that makes the deployed login work; a Vercel
environment variable would not help, because CRA inlines env vars into the bundle at
build time. There is no way to have a working public demo login whose password is not
extractable.

Given that, the choice was between shipping separate demo credentials or the real
live-site ones. **The real ones were chosen** so the deployed demo matches the live
site exactly.

Consequences to be aware of:
- The live-site password is public. Rotating it on the real site is worth considering.
- It is in git history permanently — deleting the file later does not unpublish it.
- If you ever want it private again, the fix is not `.gitignore` alone: the Vercel CLI
  uploads from the working directory and ignores `.gitignore`, so `.vercelignore`
  is needed too. That mistake already happened once (see log.md, 2026-08-02).

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
