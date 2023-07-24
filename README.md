# Tobor

Tobor is Robot spelt backwards.

Tobor is also a CLI application to help you move an imaginary robot (or other item) around an imaginary table.

Additionally, Tobor is my submission for a coding test. The instructions can be found in `INSTRUCTIONS.md`

## Configuring the application

You may configure the following settings in the application with environment variables.

| Env Var | Default Value | Description |
| --- | --- | --- |
| TABLE_LENGTH | 5 | Sets the table length. Ignored if TABLE_WIDTH is not set. |
| TABLE_WIDTH | 5 | Sets the table width. Ignored if TABLE_LENGTH is not set. |
| CAPITALISE_COMMANDS_AND_ARGS | false | When true, input commands and arguments will be capitalised to allow for case insensitive parsing - all commands and args are uppercase.  |
| EXIT_ON_COMMAND_PARSER_ERROR | false | When true, the program will exit when a command is invalid and cannot be parsed. |
| FILENAME | not set | Allows commands to be read from a file rather than interactive CLI input. |


**Filename Input** 

A convenient input file to exercise many features of the application is `docker-mount/fixtures/explore_table_boundaries.txt` and is documented in `docker-mount/fixtures/`.

Other sample files to exercise the application can be sourced from `src/__TESTS__/TestFiles/Scenarios` and are documented in `src/__TESTS__/TestFiles/Scenarios/README.md`.

## How to exercise the application

See below for instructions for each of these ways to exercise the application.

- Build and run the application in a Docker container
- Run tests locally
- Run the application locally

### System requirements

Node 18 
### Build and run the application in a docker container

**Build**

```bash
docker build --tag tobor .
```

**Run**

```bash
docker run -it tobor
```

**Run and supply environment variables**

```bash
docker run \
-e FILENAME=/app/docker-mount/fixtures/explore_table_boundaries.txt \
-e TABLE_WIDTH=5 \
-e TABLE_LENGTH=5 \
-e CAPITALISE_COMMANDS_AND_ARGS=true \
-e EXIT_ON_COMMAND_PARSER_ERROR=true \
--mount type=bind,source="$(pwd)"/docker-mount,target=/app/docker-mount \
tobor
```

### Run tests locally

`npm install`

`npm run test`

### Run the application locally

`npm install`

**Provide configuration (optional)**

`cp .env.example .env`

**Serve with nodemon**

`npm run serve`

**Build and Run**

`npm run build && npm run start`

## Design discussion

I chose to impose a constraint that all commands and arguments should be modelled in uppercase. This allows me to easily allow for case insensitivity by offering the `capitaliseCommandsAndArgs` configuration.

Where integer input is required, I am allowing any input that I can parse as an integer in base 10 that doesn't violate the entity's requirements. Eg decimal input is allowed, coordinates can't be below 0, table dimensions can't be less than 1. 

## Next steps 

Increase test coverage for CLI Input Reader.

Consider splitting up the output of the tobor service (eg REPORT command) and output that is necessary for user interaction like CLI interaction, error reporting. 


