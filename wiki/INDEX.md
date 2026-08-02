# Excel Vaults Clone — Wiki Index

> Living knowledge base for the excelvaults.com replica. Maintained by Claude Code.
> Follows the [Karpathy Wiki Pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): persistent, compounding artifact with confidence tags.
>
> Source of truth for requirements is the **Excel Vaults** Obsidian vault, `Inbox/` folder.

## Confidence Tags

| Tag | Meaning |
|-----|---------|
| `✅ VERIFIED` | Confirmed by reading current source code or authoritative docs |
| `🔶 LIKELY` | Inferred from code patterns or adjacent evidence, not directly confirmed |
| `❓ NEEDS-CLARIFICATION` | Ambiguous — needs human input |
| `⚠️ ASSUMPTION` | Educated guess based on incomplete info |
| `🪦 STALE` | Was true at one point, may no longer be accurate |
| `🔗 EXTERNAL` | Depends on an external system (live site, Obsidian vault) — verify before acting |

## Pages

### Architecture
- [architecture.md](architecture.md) — Tech stack, directory structure, entry flow

### Features
- [bypass-flags.md](bypass-flags.md) — The raw/fixed toggle covering shortcodes + desktop nav
- [mock-auth.md](mock-auth.md) — Seeded credentials and the post-login account view

### Workflow
- [debugging-workflow.md](debugging-workflow.md) — Console.log conventions, Playwright verification
- [pre-commit-workflow.md](pre-commit-workflow.md) — Build/lint checks before every commit

### Operations
- [log.md](log.md) — Chronological record of wiki and project updates

---

*Last updated: 2026-07-30*
