const input = await Deno.readTextFile('input.txt');

interface Motion {
    direction: string;
    steps: number;
}

interface Position {
    x: number;
    y: number;
}

const arePositionsEqual = (a: Position, b: Position): boolean => a.x === b.x && a.y === b.y;

const motions: Motion[] = input.split('\r\n').map((line) => {
    const [direction, steps] = line.split(' ');
    return { direction, steps: parseInt(steps) };
});

const grid: string[][] = [['H']];
const visitedPositions: string[][] = [['s']];
const start: Position = { x: 0, y: 0 };
const head: Position = { ...start };
const tail: Position = { ...start };

const printGrid = (grid: string[][]): void => grid.forEach((row) => console.log(row.join(' '), row.length));

const prependRow = () => {
    const row = Array.from({ length: grid[0].length }, () => '.');
    grid.unshift([...row]);
    visitedPositions.unshift([...row]);
    start.y++;
    head.y++;
    tail.y++;
};

const appendRow = () => {
    const row = Array.from({ length: grid[0].length }, () => '.');
    grid.push([...row]);
    visitedPositions.push([...row]);
};

const prependColumn = () => {
    for (let i = 0; i < grid.length; i++) {
        grid[i].unshift('.');
        visitedPositions[i].unshift('.');
    }
    start.x++;
    head.x++;
    tail.x++;
};

const appendColumn = () => {
    for (let i = 0; i < grid.length; i++) {
        grid[i].push('.');
        visitedPositions[i].push('.');
    }
}

const moveKnots = (grid: string[][], head: Position): void => {
    if (arePositionsEqual(head, tail)) {
        grid[head.y][head.x] = 'T';
    } else if (arePositionsEqual(head, start)) {
        grid[head.y][head.x] = 's';
    } else {
        grid[head.y][head.x] = '.';
    }
}

for (const { direction, steps } of motions) {
    for (let i = 0; i < steps; i++) {
        if (direction === 'R') {
            if (grid[head.y].length <= head.x + 1) {
                appendColumn();
            } 

            grid[head.y][head.x + 1] = 'H';
            moveKnots(grid, head);
            head.x++;
        }

        if (direction === 'L') {
            if (head.x - 1 < 0) {
                prependColumn();
            }

            grid[head.y][head.x - 1] = 'H';
            moveKnots(grid, head);
            head.x--;
        }
        
        if (direction === 'U') {
            if (head.y - 1 < 0) {
                prependRow();
            }

            grid[head.y -1][head.x] = 'H';
            moveKnots(grid, head);
            head.y--;
        }

        if (direction === 'D') {
            if (grid.length <= head.y + 1) {
                appendRow();
            }

            grid[head.y + 1][head.x] = 'H';
            moveKnots(grid, head);
            head.y++;
        }

        // TODO directions

        // move tail right
        let diff = head.x - tail.x;
        if (Math.abs(diff) > 1) {
            if (arePositionsEqual(tail, start)) {
                grid[tail.y][tail.x] = 's';
            } else {
                grid[tail.y][tail.x] = '.';
            }

            if (diff > 0) {
                tail.x++;
            } else {
                tail.x--;
            }

            if (head.y - tail.y >= 1) { 
                tail.y++;
            } else if (head.y - tail.y <= -1) {
                tail.y--;
            }
            grid[tail.y][tail.x] = 'T';
            visitedPositions[tail.y][tail.x] = '#';
        }

        // move tail up
        diff = head.y - tail.y;
        if (Math.abs(diff) > 1) {
            if (arePositionsEqual(tail, start)) {
                grid[tail.y][tail.x] = 's';
            } else {
                grid[tail.y][tail.x] = '.';
            }
            if (diff > 0) {
                tail.y++;   
            } else {
                tail.y--;
            }
            if (head.x - tail.x >= 1) {
                tail.x++;
            } else if (head.x - tail.x <= -1) {
                tail.x--;
            }
            grid[tail.y][tail.x] = 'T';
            visitedPositions[tail.y][tail.x] = '#';
        }
    }
}

console.log(printGrid(grid));
console.log(printGrid(visitedPositions));

const numberOfVisitedPositions = visitedPositions.reduce((accumulator, row) => accumulator + row.reduce((rowAccumulator, position) => rowAccumulator + ((position === '#' || position === 's') ? 1 : 0), 0), 0);
console.log(numberOfVisitedPositions);