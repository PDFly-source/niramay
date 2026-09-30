# Security Policy

## Reporting a Vulnerability

If you discover a security issue in Niramay, please report it **privately**
through [GitHub security advisories](https://github.com/PDFly-source/niramay/security/advisories/new)
so maintainers can assess and fix it before public disclosure.

Please **do not** open a public issue containing:
- working proof-of-concept exploits,
- user data or private credentials,
- anything that could enable attacks against live users.

## Scope Notes

Niramay is a fully static, client-side application:

- There is no backend server, database, or authentication system.
- The app stores data only in the browser's `localStorage`.
- No secrets, API keys, or service credentials are bundled in the app
  (the local AI engine runs entirely in the browser).

Reports about dependency vulnerabilities, service-worker caching issues,
or content-injection risks in user-generated strings are welcome.

## Responsible Disclosure

Please allow a reasonable amount of time for a fix before any public
disclosure. We will credit reporters in release notes when they wish.
