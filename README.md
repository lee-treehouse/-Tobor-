# -Tobor-

Tobor is Robot spelt backwards.

Tobor is also a CLI application to help you move an imaginary robot (or other item) around an imaginary table.

Additionally, Tobor is my submission for a coding test. The instructions can be found in `INSTRUCTIONS.md`

## Configuring the application

You may configure the following settings in the application with environment variables.

| Env Var | Default Value | Description |
| --- | --- | --- |
| TABLE_HEIGHT | 5 | Sets the table height. TABLE_WIDTH must also be set. |
| TABLE_WIDTH | 5 | Sets the table width. TABLE_HEIGHT must also be set. |
| CAPITALISE_COMMANDS_AND_ARGS | false | Allows case insensitive parsing of commands and arguments. |
| FILENAME | not set | Allows commands to be entered from file rather than CLI. |


**Filename Input** 

 A convenient input file to exercise many features of the application is `docker-mount/fixtures/explore_table_boundaries.txt` and is documented in `docker-mount/fixtures/`.

Other sample files to exercise the application can be sourced from `src/__TESTS__/TestFiles/Scenarios` and are documented in `src/__TESTS__/TestFiles/Scenarios/README.md`.

## How to exercise the application

See below for instructions for each of these ways to exercise the application.

- Build and run the application in a Docker container
- Run tests locally
- Run the application locally

### System requirements

TODO

### Build and run the application in a docker container

**Build**

```bash
docker build --tag tobor .
```

**Run**

```bash
docker run tobor
```

**Run and supply environment variables**

```bash
docker run \
-e FILENAME=/app/docker-mount/fixtures/explore_table_boundaries.txt \
-e TABLE_WIDTH=5 \
-e TABLE_HEIGHT=5 \
-e CAPITALISE_COMMANDS_AND_ARGS=true \
--mount type=bind,source="$(pwd)"/docker-mount,target=/app/docker-mount \
tobor
```

### Run tests locally

`npm run test`

### Run the application locally

**Provide configuration if desired**

`cp .env.example .env`

**Serve with nodemon**

`npm run serve`

**Build and Run**

`npm run build && npm run start`

## Design discussion

I chose to impose a constraint that all commands and arguments should be modelled in uppercase. This allows me to easily allow for case insensitivity by offering the `capitaliseCommandsAndArgs` configuration.

I chose to implement compass directions (and turning LEFT or RIGHT from a compass direction) in the way that was easiest for the reader to understand. If more compass directions were to be modelled (like NORTH-WEST, NORTH-EAST, SOUTH-WEST, SOUTH-EAST) I'd suggest modifying `getNextDirectionLeft` and `getNextDirectionRight` to be one function that can cycle forward or backwards through an array of compass directions derived from the enum. If compass directions are to be more granular than that, an object that holds the name of the compass direction and the angle in degrees might be a better data structure.

Where integer input is required, I am allowing any input that I can parse as an integer in base 10 that doesn't violate the entity's requirements. Eg decimal input is allowed.
