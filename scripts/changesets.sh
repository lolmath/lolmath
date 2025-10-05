#!/usr/bin/env bash

# Create a truly minimal dummy .npmrc (only a comment) so Changesets detects a file
# without altering publish/auth behavior. This file is safe because it contains
# no config directives. It is created only if missing.
if [ ! -f .npmrc ]; then
	echo "# dummy .npmrc (placeholder for changesets)" > .npmrc
	echo "Created minimal temporary .npmrc placeholder"
fi

if [[ "$CI_COMMIT_BRANCH" = "main" ]]; then
	npx changesets-gitlab
elif [[ "$CI_COMMIT_BRANCH" != "main" && "$CI_COMMIT_BRANCH" != changeset-release* ]]; then
	pnpm run changeset version --snapshot
	pnpm run changeset publish --tag canary --no-git-tag
fi