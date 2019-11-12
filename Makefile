.SHELL := /bin/bash
COMPOSE_HTTP_TIMEOUT=120
DOCKER_TAG ?= latest

help: ## Help documentation
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_0-9-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

docker-clean: ## Clean up the last containers for this project
	@docker-compose down --rmi local -v --remove-orphans

init: ## Install required tools for local environment on macOS
	brew install awscli || exit 0
	curl -L https://github.com/hasura/graphql-engine/raw/master/cli/get.sh | bash || exit 0

install: ## Install dependencies for frontend application
	@(cd client && yarn)

start: ## Start the containers
	@(COMPOSE_HTTP_TIMEOUT=$$COMPOSE_HTTP_TIMEOUT docker-compose up --remove-orphans --build)

start-clean: docker-clean start ## Clean the docker containers then start

