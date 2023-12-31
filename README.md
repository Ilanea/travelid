# Travelid

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Download and install NodeJS

https://nodejs.org/en/download

## Install npm dependencies

```
npm install
```

## Run the dev server from console

This will serve 2 or more apps parallel from one console, or use nx console.

```
npx nx run-many -t serve -p apps/backend apps/frontend-hotel
```

## Get the backend up and running
Download and install Docker Desktop from https://www.docker.com/

Start the docker compose in the apps/backend folder from a shell, or use the VSCode Docker plugin (Rightclick on the file -> Compose Up)

```
docker compose up
```

Configure Prisma DB and Prisma Client
(from apps/backend)
```
npx prisma generate
npx prisma migrate dev
```

## Use the VSCode Plugin

https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console

## Swagger API Documentation
http://localhost:3333/api-docs
