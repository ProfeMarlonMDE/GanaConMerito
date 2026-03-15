---
name: gcm-project-operating-system
description: Organize work for GanaConMerito across Telegram, VPS, workspace, GitHub, and production deploys. Use when deciding where work should happen, which repo is authoritative, how to move from idea to implementation to deploy, how to coordinate multiple AIs, how to avoid losing changes, or how to recover when VPS/workspace/GitHub diverge.
---

# GCM Project Operating System

Use this skill when the task is not just technical implementation, but **project operating order**: source of truth, workflow, AI role split, deploy sequencing, or avoiding drift between workspace, VPS, GitHub, and production.

## Read these files first

1. `docs/project/source-of-truth.md`
2. `docs/project/operating-model-ias.md`
3. `docs/project/current-workflow.md`

## Then read as needed

- `docs/project/vps-source-of-truth-rollout-plan.md` when the current reality is VPS-first and GitHub is lagging
- `docs/architecture/editorial-admin-consolidated-plan.md` when the task affects the segmentation/editorial roadmap
- `docs/project/segmentation-rollout-checklist.md` when a rollout or validation is involved

## Core operating rules

- Treat GitHub as the desired canonical repo, even if temporary work happens in VPS/workspace.
- Do not let important changes live only in chat, workspace, or deployed VPS paths.
- Distinguish clearly between design, implementation, versioning, deploy, and validation.
- Assign each AI a clear role: strategy/review, execution, or audit.
- When divergence appears between workspace, VPS, and GitHub, stabilize production first, then consolidate and version the truth.

## Output style for this skill

When helping the user organize work, produce:
1. the recommended source of truth for the task
2. the execution environment
3. the repo/file locations affected
4. the next 3–5 concrete steps
5. explicit warnings about drift or loss risk if applicable

Keep it structured, direct, and operational.
