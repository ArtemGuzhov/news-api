# Setup

There are two ways to start up the app: docker or local

## Using docker

Create **.env** file in **./docker**:

```bash
cp ./docker/.env.example ./docker/.env
```

Set env variables:

```bash
nano ./docker/.env
```

Create **.env** file in **app dir**:

```bash
cp .env.example .env
```

Set env variables:

```bash
nano .env
```

Launch **docker-compose** from **./docker** for start app, postgres, adminer services:

```bash
cd ./docker && docker-compose up --build -d
```

## Run Locally

Set node version:

```bash
nvm use
```

Install dependencies:

```bash
npm i
```

Create **.env** file in **app dir**:

```bash
cp .env.example .env
```

Set env variables:

```bash
nano .env
```

Launch **docker-compose** from **./docker** for start postgres, adminer services:

```bash
cd ./docker && docker-compose up --build -d postgres adminer
```

Run service:

```bash
npm run start
```
