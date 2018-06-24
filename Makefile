start:
	npm run start

build:
	npm run webpack -- --env.HOST=$(HOST)

lint:
	npm run eslint src/