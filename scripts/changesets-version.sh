if [ "$CI_COMMIT_BRANCH" = "main" ]; then
pnpm run changeset version
else
pnpm run changeset version --snapshot
fi