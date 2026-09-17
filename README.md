# Google Sheets Email Automation

A production-ready Google Apps Script solution designed to automate personalized HTML email notifications directly from structured Google Sheets data. Built for institutional and educational workflows, this tool supports multi-tab iteration, dynamic variable substitution, recipient exclusion lists, supervisor BCC attachments, and a safe dry-run mode.

## Key Features

* **Multi-Tab Processing:** Automatically iterates across specified sheet tabs (e.g., `CS`, `DS`, `SN`) in a single execution.
* **Dynamic HTML Personalization:** Replaces placeholders (such as `{{HORAS}}`) with row-specific values for each recipient.
* **Exclusion List (Blacklist):** Bypasses previously notified recipients to prevent duplicate emails.
* **BCC Auditing:** Automatically attaches administrative tutors or supervisors via CCO/BCC.
* **Safety Test Mode:** Includes a toggle (`MODO_PRUEBA = true`) to send a single verification email to an administrator before triggering live distribution.

## Project File Structure

```text
├── enviarCorreos.gs    # Main Google Apps Script source file
└── README.md           # Project documentation
