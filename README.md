# Tobor

Tobor is Robot spelt backwards.

Tobor is also a CLI application to help you move an imaginary robot (or other item) around an imaginary table.

Additionally, Tobor is my submission for a coding test. The instructions can be found in `INSTRUCTIONS.md`

## Configuring the application

You may configure the following settings in the application with environment variables.

- Table width and height (via `TABLE_HEIGHT` and `TABLE_WIDTH` env vars - both must be set)
- Case insensitive processing of inputs (via `CAPITALISE_COMMANDS_AND_ARGS` env var)
- Reading input from file or interactively in CLI (via `FILENAME` env var)

Sample files to exercise the application are provided in `docker-mount/fixtures` and documented in the readme located there. `explore_table_boundaries.txt` is a good input to exercise many features of the application.

## How to exercise the application

See below for instructions for each of these ways to exercise the application.

- Build and run the application in a Docker container
- Run tests locally
- Run the application locally

### System requirements

TODO

### Build and run the application in a docker container

**Build**

```docker build --tag tobor .```

**Run**

```docker run tobor```

**Run and supply environment variables**

```
docker run \
-e FILENAME=/app/docker-mount/fixtures/explore_table_boundaries.txt \
-e TABLE_WIDTH=5 \
-e TABLE_HEIGHT=5 \
--mount type=bind,source="$(pwd)"/docker-mount,target=/app/docker-mount \
tobor
```

### Run tests locally

TODO
### Run the application locally

TODO
## Design discussion

I chose to impose a constraint that all commands and arguments should be modelled in uppercase. This allows me to easily allow for case insensitivity by offering the `capitaliseCommandsAndArgs` configuration.

I chose to implement compass directions (and turning LEFT or RIGHT from a compass direction) in the way that was easiest for the reader to understand. If more compass directions were to be modelled (like NORTH-WEST, NORTH-EAST, SOUTH-WEST, SOUTH-EAST) I'd suggest modifying `getNextDirectionLeft` and `getNextDirectionRight` to be one function that can cycle forward or backwards through an array of compass directions derived from the enum. If compass directions are to be more granular than that, an object that holds the name of the compass direction and the angle in degrees might be a better data structure.
