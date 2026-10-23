Read `AGENTS.md` in the repo root and follow it. It has the rules for building and
shipping this prototype, and it points to the PM workflow skills in `.agents/`.

The skills in `.agents/skills/` are symlinked into `.claude/skills/`, so they are
invocable as slash commands (`/prd-draft`, `/rapid-prototyping`, …). Edit the files
under `.agents/skills/` — never the symlinks.
