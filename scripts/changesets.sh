if [[ "$CI_COMMIT_BRANCH" = "main" ]]; then
	npx changesets-gitlab
elif [[ "$CI_COMMIT_BRANCH" != "main" && "$CI_COMMIT_BRANCH" != changeset-release* ]]; then
	pnpm run changeset version --snapshot
	echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
	pnpm run changeset publish --tag canary --no-git-tag
fi