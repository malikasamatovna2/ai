# How to push this project to GitHub

There are two quick options. Run these commands locally on your machine (make sure Git is installed and configured).

Option A — push to an existing remote
1. Install Git if you don't have it: https://git-scm.com/downloads
2. In project root run (PowerShell / terminal):

```powershell
git init
git add .
git commit -m "Initial commit: StylistMatch monorepo scaffold"
# Replace <REMOTE_URL> with the GitHub repo HTTPS/SSH URL you created
git remote add origin <REMOTE_URL>
git branch -M main
git push -u origin main
```

Option B — create repo using GitHub CLI (recommended)
1. Install GitHub CLI and authenticate: https://cli.github.com/
2. Run:

```powershell
# create new repo under your account
gh repo create YOUR_GITHUB_USERNAME/StylistMatch --public --source=. --remote=origin --push
```

If you want, you can run the script included in `scripts/push-to-github.ps1` which automates Option A. The script will ask for the remote URL.

If you'd like, I can also create a GitHub Actions workflow and Replit/Vercel deploy config after the repo is pushed.
