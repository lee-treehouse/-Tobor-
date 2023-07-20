run and pass environment variable

build

docker build --tag tobor .

volume stuff

// great explanation https://docs.docker.com/storage/bind-mounts/

docker run \
-e FILENAME=/app/docker-mount/fixtures/example1.txt \
-e TABLE_WIDTH=23 \
-e TABLE_HEIGHT=27 \
--mount type=bind,source="$(pwd)"/docker-mount,target=/app/docker-mount \
tobor
