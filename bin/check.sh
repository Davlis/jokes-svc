#!/bin/sh
set -e

yarn run build:check
yarn run lint
yarn run test
yarn run format:check
