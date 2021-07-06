# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


# Docker

## Running application

```
docker-compose up 
```

## Getting information about containers

### Working containers
```
docker ps

docker ps -a
```
### Container logs
```
docker logs infinite
```
### Container Information
```
docker inspect infinite
```

## Image Management

### List of images
```
docker images
```
### Creating images
```
docker build .

docker build github.com/creack/docker-firefox

docker build - < Dockerfile

docker build - < context.tar.gz

docker build -t eon/infinite .

docker build -f myOtherDockerfile .

curl example.com/remote/Dockerfile | docker build -f - .
```
### Deleting an image
```
docker rmi nginx
```
### Loading a repository in tar (from a file or standard input)
```
docker load < ubuntu.tar.gz

docker load --input ubuntu.tar
```
### Saving an image to a tar archive
```
docker save busybox > ubuntu.tar
```
### View Image History
```
docker history
```
### Creating an image from a container
```
docker commit nginx
```
### Tagging an image
```
docker tag nginx eon01/nginx
```
### Push (uploading to the registry) of the image
```
docker push eon01/nginx
```

# Nest

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
