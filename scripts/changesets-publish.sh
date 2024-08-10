if [ "$CI_COMMIT_BRANCH" = "main" ]; then
pnpm run changeset publish
else
pnpm run changeset publish --tag canary --no-git-tag
fi