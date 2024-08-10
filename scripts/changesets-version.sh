if [ "$CI_COMMIT_BRANCH" = "main" ]; then
	pnpm run changeset version
else
	pnpm run changeset version --snapshot
	pnpm run changeset publish --tag canary --no-git-tag
	git reset --hard HEAD~1
fi