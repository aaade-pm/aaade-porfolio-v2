---
name: git-flow-ship
description: >
  Ships repo changes using this project's mandatory git-flow. Runs build, bases
  work on staging, uses feat/* branches only, rebases on origin/staging, and
  pushes the feature branch—never staging or main unless the user explicitly
  names that branch. Use when the user asks to push, ship, publish the branch,
  prepare for PR, run git-flow, follow git-flow before push, or invoke the
  git-flow-ship / ship agent.
---

# Git-flow ship (strict)

**Authoritative rule file (read it every time before acting):** `.cursor/rules/git-flow.mdc`

If anything here conflicts with `git-flow.mdc`, **`git-flow.mdc` wins.**

## Non-negotiables

- **`main`:** release only. **Do not push** unless the user **explicitly** says to push `main` (by name).
- **`staging`:** integration. **Do not push** unless the user **explicitly** says to push `staging` (by name).
- **Delivery** = **`feat/<short-description>`** pushed to `origin`, then the **user** opens **`feat/…` → `staging`** PRs (and later `staging` → `main`). The agent does **not** merge or open/close PRs unless the user explicitly asks.

## Workflow (execute in order)

1. **Inspect state**
   - `git status`, `git branch -vv`, confirm what is uncommitted and which branch you are on.
   - If there are unrelated changes mixed with the feature, stop and **split commits** or **stash** only with user direction—prefer separate logical commits (never one unrelated megacommit).

2. **Sync `staging`**
   - `git fetch origin`
   - `git checkout staging && git pull origin staging` (resolve any local-only mess first if needed).

3. **Feature branch**
   - If not already on `feat/…` for this work: `git checkout -b feat/<short-description>` from updated `staging`.
   - If already on a `feat/…` branch: merge or cherry-pick only as needed; **do not** deliver from `staging`/`main`.

4. **Commit**
   - Group changes into **focused commits** (one concern per commit). Do not mix unrelated files in the same commit.
   - Messages: clear, imperative, scoped (e.g. `feat(gallery): curated life preview`).

5. **Build gate (required before push)**
   - From repo root: **`npm run build`**
   - Fix failures before pushing. **`npm run lint`** if the project uses it and the change touches JS/TS/CSS.

6. **Rebase on integration branch**
   - `git fetch origin`
   - `git checkout feat/<short-description>`
   - `git rebase origin/staging`
   - Resolve conflicts on the feature branch; **never** force-push unless the user **explicitly** asks.

7. **Push (allowed target only)**
   - `git push -u origin feat/<short-description>`
   - **Do not** `git push origin staging` or `git push origin main` unless the user **explicitly** requested that exact branch.

8. **Report back**
   - Branch name pushed, commit summary (titles), and that the user should open **PR: `feat/…` → `staging`** (and paste the GitHub “open PR” URL pattern if the remote is GitHub).

## Forbidden unless explicitly requested

- Pushing **`staging`** or **`main`**
- **`git push --force`** / **`--force-with-lease`** to shared branches
- Merging, squash-merge, closing issues, or managing PRs
- Deleting remotes or branches on the remote

## Quick reference

```bash
git fetch origin
git checkout staging && git pull origin staging
git checkout -b feat/short-description   # or checkout existing feat branch
# …commit in logical groups…
npm run build
git fetch origin && git rebase origin/staging
git push -u origin feat/short-description
```

## Project root

Assume repository root is the workspace containing `.cursor/rules/git-flow.mdc`. Adjust commands if the user’s shell cwd differs.
