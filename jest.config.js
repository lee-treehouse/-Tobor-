process.env.TABLE_HEIGHT = 2;
process.env.TABLE_WIDTH = 99;
process.env.FILENAME = 'docker-mount/fixtures/example1.txt';

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
};
