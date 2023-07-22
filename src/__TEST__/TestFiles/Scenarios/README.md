# Examples Reference

## Examples based on Instructions

- `instructions_example1.txt`
- `instructions_example2.txt`
- `instructions_example3.txt`

provide the example inputs specified in `INSTRUCTIONS.md` in the root of this project. Files containing the expected result are colocated with an `_expected`` suffix eg `instructions_example1_expected.txt``

- `Configuration/instructions_example3_lowercase.txt`

provides the instructions from 'instructions_example3.txt' with the command and its' arguments in lowercase. Expected results are available from files with the `expected_if_capitalise` and `expected_if_not_capitalise` suffix in their filename. 

### Example 1

```plain
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
Expected output: 3,3,NORTH
```

### Example 2

```plain
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST
Expected output: 3,3,NORTH
```

### Example 3

```plain
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Expected output: 3,3,NORTH
```

### Example 3 Lowercase

```plain
place 1,2,east
move
move
left
move
report
Expected output: 3,3,NORTH
```

## Explore table boundaries

- `explore_table_boundaries.txt`

provides instructions that allow the table boundaries to be accessed and reoprted on. For a default 5 x 5 table, these instructions will

- start at the South West corner
- MOVE North to the North West corner and REPORT
- try to MOVE further North and REPORT
- MOVE East to the North East corner and REPORT
- try to MOVE further East and REPORT
- MOVE South to the South East corner and REPORT
- try to MOVE further South and REPORT
- MOVE West to the South West corner (original position) and REPORT

```plain
PLACE 0,0,NORTH
MOVE
MOVE
MOVE
MOVE
REPORT
MOVE
REPORT
RIGHT
MOVE
MOVE
MOVE
MOVE
REPORT
MOVE
REPORT
LEFT
LEFT
LEFT
MOVE
MOVE
MOVE
MOVE
REPORT
MOVE
REPORT
RIGHT
MOVE
MOVE
MOVE
MOVE
REPORT

Expected output:

0,4,NORTH
0,4,NORTH
4,4,EAST
4,4,EAST
4,0,SOUTH
4,0,SOUTH
0,0,WEST
```
