# ADR 0001: Open-Source-WordPress-Architektur

Status: Superseded by ADR 0002
Date: 2026-08-30

## Context

The original architecture made Fairgate the permanent membership and accounting system. The project update dated 2026-08-30 permits an integrated open-source solution with minimal recurring software costs. WordPress remains mandatory.

## Decision

- WordPress is the public and authenticated presentation platform.
- WordPress performs user authentication.
- Club-specific logic belongs in the STRC Core plugin.
- WordPress Core and third-party plugins remain unmodified.
- Gutenberg and a repository-owned block theme replace Elementor by default.
- STRC Core is the membership and accounting system of record.
- Fairgate is replaced after tested data migration and acceptance.
- WooCommerce remains the operational shop system.
- Infrastructure-level backups replace plugin-dependent backups.
- Production is designed for a WordPress-capable Hetzner environment.

## Consequences

- CiviCRM remains an optional future migration target.
- The transition needs an explicit data-ownership matrix.
- Staging and production require operational Linux competence.
- The club owns all custom source code and migration tooling.
- Paid plugins require a documented exception and exit strategy.

## Not decided by this ADR

- Final financial accounting replacement.
- Final payment provider.
- Final production cutover date.
- Production server size.
- Cancellation of contracts remains a board decision.
