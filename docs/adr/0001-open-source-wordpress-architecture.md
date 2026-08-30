# ADR 0001: Open-Source-WordPress-Architektur

Status: Accepted for implementation foundation  
Date: 2026-08-30

## Context

The original architecture made Fairgate the permanent membership and accounting system. The project update dated 2026-08-30 permits an integrated open-source solution with minimal recurring software costs. WordPress remains mandatory.

## Decision

- WordPress is the public and authenticated presentation platform.
- WordPress performs user authentication.
- Club-specific logic belongs in the STRC Core plugin.
- WordPress Core and third-party plugins remain unmodified.
- Gutenberg and a repository-owned block theme replace Elementor by default.
- CiviCRM is evaluated as the future membership system of record.
- Fairgate remains available until the board approves a proven cutover.
- WooCommerce remains the operational shop system.
- Infrastructure-level backups replace plugin-dependent backups.
- Production is designed for a WordPress-capable Hetzner environment.

## Consequences

- A CiviCRM fit-gap and load spike is mandatory.
- The transition needs an explicit data-ownership matrix.
- Staging and production require operational Linux competence.
- The club owns all custom source code and migration tooling.
- Paid plugins require a documented exception and exit strategy.

## Not decided by this ADR

- Final financial accounting replacement.
- Final payment provider.
- Final CiviCRM cutover date.
- Production server size.
- Any cancellation of an existing Fairgate contract.
