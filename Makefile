setup:
	@npm install

dev:
	@npm run start

dev-android:
	@npm run android

dev-ios:
	@npm run ios

dev-web:
	@npm run web

format:
	npm run format

lint:
	npm run lint

typecheck:
	npm run typecheck

build:
	@npm run build

test:
	@npm run test

precommit:
	@$(MAKE) format
	@$(MAKE) lint
	@$(MAKE) typecheck
	@$(MAKE) build
	@$(MAKE) test

clean:
	rm -rf node_modules/
