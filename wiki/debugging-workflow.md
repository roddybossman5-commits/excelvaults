# Debugging Workflow

Carried over from mangotv unchanged — same conventions, same reasons.

## Console Logging Convention `✅ VERIFIED` (established practice)

**Every new code written MUST include debug console.logs for each logical step.**
These are what make the Playwright MCP verification loop useful — without them you
are screenshot-diffing blind.

### Format

```javascript
// Consistent prefix per file/feature for easy filtering
console.log('[ComponentName] step description:', relevantData);

// Examples from this codebase:
console.log('[renderMode] resolved from query string:', fromQuery);
console.log('[Navbar] rendering:', { mode, links: NAV_LINKS.length });
console.log('[mockAuth] login attempt:', { username, seeded: seed.users.length });
console.log('[shortcodes] stripped copy:', { before, after });
```

### Rules

1. **Every async operation:** log before the call, log the response shape, log errors
2. **Every component mount:** log what props/state it received
3. **Every conditional branch:** log which branch was taken and why
4. **Every Redux dispatch:** log the action type and key payload fields
5. **Every style-affecting calculation:** log computed values
6. **Never log a password.** `mockAuthService` logs the username only — keep it that way.

## Playwright Verification `✅ VERIFIED` (the core loop)

This is the workflow the vault note asks for. After writing a feature:

1. `npm start`
2. Navigate to the affected route via Playwright MCP
3. Read the console — verify the logs appear in the expected order, no errors
4. Screenshot for visual verification
5. **Resize.** Nav behaviour is viewport-dependent (issues 1/2) — check desktop
   (1280×800) *and* mobile (375×667) before calling anything done
6. **Toggle the flag.** Re-run with `?mode=raw` and `?mode=fixed` — a fix that only
   works in one mode is not a fix. See [bypass-flags.md](bypass-flags.md)

### Visibility vs Presence

The raw/fixed nav difference is pure CSS — the DOM is identical either way. Assert on
computed visibility, not element presence, or every check passes vacuously.

## When to Remove Logs

Do NOT remove debug logs while the replica is in progress. They stay until the build
is signed off. Count remaining ones with:

```bash
grep -rn "console.log(\[" src/ | wc -l
```

## Error Handling Logs

```javascript
console.error('[ComponentName] failed to do X:', {
  error: err.message,
  context: { id, route },
});
```
