## Explore table boundaries

- `explore_table_boundaries.txt`

provides instructions that allow the table boundaries to be accessed and reported on. These instructions will

- start at the South West corner
- MOVE North to the North West corner and REPORT
- try to MOVE further North and REPORT
- MOVE East to the North East corner and REPORT
- try to MOVE further East and REPORT
- MOVE South to the South East corner and REPORT
- try to MOVE further South and REPORT
- MOVE West to the South West corner (original position) and REPORT

```plain
Expected output for a default 5x5 table:

0,4,NORTH
0,4,NORTH
4,4,EAST
4,4,EAST
4,0,SOUTH
4,0,SOUTH
0,0,WEST
```

```plain
Input:

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
```
