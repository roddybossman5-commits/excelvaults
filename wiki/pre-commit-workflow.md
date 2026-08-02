# Pre-Commit Workflow

## The Problem `✅ VERIFIED`

React's production build treats lint warnings as errors when `CI=true` — unused
variables, unused imports, missing `alt` props. All of these work fine under
`npm start` and then fail the build. mangotv hit this repeatedly.

## Mandatory Steps Before Every Commit

### Step 1: Run the production build locally
```bash
npm run build
```
On Windows PowerShell, reproduce CI exactly with:
```powershell
$env:CI="true"; npm run build
```
Fix ALL errors before proceeding.

### Step 2: Common lint issues and fixes

| Error | Fix |
|-------|-----|
| `'X' is defined but never used` | Remove the unused import/variable |
| `'X' is assigned a value but never used` | Remove it, or prefix with `_` if intentional |
| `React Hook useEffect has a missing dependency` | Add the dep, wrap in `useCallback`, or disable with a comment explaining why |
| `img elements must have an alt prop` | Add `alt="description"` |
| `'X' is not defined` | Import the missing module |
| `Do not use Array index in keys` | Use a unique identifier instead of `index` |

### Step 3: Fast lint check
```bash
npm run lint
```
(`eslint src/ --ext .js,.jsx --quiet` — errors only, no warnings.)

### Step 4: Pre-existing issues in files you touch
Fix them if they are on lines you touched. Leave untouched-line issues alone unless
they break the build. Do NOT introduce new ones.

### Step 5: Commit
Only after the build succeeds locally.

## Repo-Specific Gotcha `✅ VERIFIED`

If `npm run build` fails with `MODULE_NOT_FOUND` on `ajv/dist/compile/codegen`, the
`ajv ^8.18.0` direct dependency has gone missing from `package.json`. Restore it —
see [architecture.md](architecture.md).

## Commit Identity `✅ VERIFIED`

This repo has a **local** git identity (`roddybossman5-commits`) overriding the global
one. If commits start showing the wrong author, check `git config --local user.email`.
