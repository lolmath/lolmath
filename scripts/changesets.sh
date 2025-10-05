#!/usr/bin/env bash

USER_NPMRC="${HOME}/.npmrc"
echo "# dummy .npmrc (placeholder for changesets)" > "$USER_NPMRC"

if [[ "$CI_COMMIT_BRANCH" = "main" ]]; then
	npx changesets-gitlab
elif [[ "$CI_COMMIT_BRANCH" != "main" && "$CI_COMMIT_BRANCH" != changeset-release* ]]; then
	pnpm run changeset version --snapshot
	pnpm run changeset publish --tag canary --no-git-tag
fi