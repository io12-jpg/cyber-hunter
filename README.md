# Cyber Hunter

Cyber Hunter is a local-first cybersecurity toolkit built with plain HTML, CSS, and JavaScript. It runs in a desktop browser without an account, backend, or package installation.

## Features

- Generate random passwords with the Web Crypto API.
- Get a local, approximate password-strength estimate.
- Calculate SHA-256 file hashes with the Web Crypto API.
- Practice security basics with a short quiz.
- Browse practical cybersecurity tips.

## Run

Open `index.html` in a modern browser. SHA-256 file hashing requires a secure context, such as HTTPS or `localhost`; some browser security features may be limited when opening a local file directly.

The app does not upload passwords or files. The strength checker is an educational estimate, not a security guarantee. A file hash can help verify integrity but cannot determine whether a file is safe.
