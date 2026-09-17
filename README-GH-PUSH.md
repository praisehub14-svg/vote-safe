# Deploy VoteSafe to GitHub Pages

Follow these steps locally to push this project to your GitHub repo and trigger automatic deployment to GitHub Pages (workflow included).

1. Initialize git, commit, and add remote (run in project root):

```bash
git init
git add .
git commit -m "Initial VoteSafe site with admin dashboard and Cloud Function"
git remote add origin https://github.com/praisehub14-svg/Student-Convocation-.git
git branch -M main
git push -u origin main
```

2. The repository contains a GitHub Actions workflow `.github/workflows/deploy-pages.yml` that will publish the repository root to the `gh-pages` branch on every push to `main`.

3. After pushing, open your repo Settings → Pages and confirm the site is published from the `gh-pages` branch. The site URL will be:

```
https://praisehub14-svg.github.io/Student-Convocation-/
```

4. If you prefer Pages to publish from `main` (root) instead of `gh-pages`, open Settings → Pages and change Source to `main` / root.

5. If you need to push using SSH or a different remote URL, change the `git remote add origin` command accordingly.

Security note: Do not share personal access tokens in chat. Use the `GITHUB_TOKEN` provided to Actions for workflow deploys — it's already wired in the workflow.
