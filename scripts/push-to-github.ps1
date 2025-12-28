param(
  [string]$remoteUrl
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)){
  Write-Error "Git is not installed or not available in PATH. Install Git first: https://git-scm.com/downloads"
  exit 1
}

if (-not $remoteUrl){
  $remoteUrl = Read-Host 'Enter GitHub remote URL (HTTPS or SSH)'
}

git init
git add .
git commit -m "Initial commit: StylistMatch monorepo scaffold"
if (-not (git remote)){
  git remote add origin $remoteUrl
}

git branch -M main
git push -u origin main

Write-Host "Done. Repository pushed to $remoteUrl" -ForegroundColor Green
