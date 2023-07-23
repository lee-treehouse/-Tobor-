# Tobor

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
-e TABLE_HEIGHT=5 \
-e CAPITALISE_COMMANDS_AND_ARGS=true \
--mount type=bind,source="$(pwd)"/docker-mount,target=/app/docker-mount \
tobor
```

### Run tests locally

`npm run test`

### Run the application locally

**Provide configuration (optional)**

`cp .env.example .env`

**Serve with nodemon**

`npm run serve`

**Build and Run**

`npm run build && npm run start`

## Design discussion

I chose to impose a constraint that all commands and arguments should be modelled in uppercase. This allows me to easily allow for case insensitivity by offering the `capitaliseCommandsAndArgs` configuration.

Where integer input is required, I am allowing any input that I can parse as an integer in base 10 that doesn't violate the entity's requirements. Eg decimal input is allowed.

When invalid input is received, I am advising the user of the problem and then exiting the program. 

## Next steps 

Increase test coverage for CLI Input Reader, will require mocking cli input.

Introduce setting that allows continuing the program when invalid input is received. Make parser errors a type of error so they can be recovered from in tobor service. Give line readers an interactive property so I can default to continuing when interactive is true and not when interactive is false. 

Extend logger interface so I can cache what has been logged and check that in tests instead of needing to spy.



