# Cyber Hunter

Cyber Hunter is a local-first cybersecurity toolkit built with plain HTML, CSS, and JavaScript. It runs in a desktop browser without an account, backend, or package installation.

## Features

- Generate random passwords with the Web Crypto API.
- Generate username, brand, startup, gaming, YouTube, and domain name ideas from optional keywords and style filters.
- Get a local, approximate password-strength estimate.
- Calculate SHA-256 file hashes with the Web Crypto API.
- Practice security basics with a short quiz.
- Browse practical cybersecurity tips.
- Switch between dark and light themes; the interface adapts for smaller screens and reduced-motion preferences.
- Search Google inside the Cyber Hunter workspace without leaving the app.

## Run

Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1` in PowerShell, then visit `http://localhost:8765/`. SHA-256 file hashing requires a secure context such as HTTPS or `localhost`.

Passwords, names, and files are processed locally. Google receives a search query only when you submit it. The strength checker is an educational estimate, not a security guarantee. A file hash can help verify integrity but cannot determine whether a file is safe.
