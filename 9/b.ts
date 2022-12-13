const input = await Deno.readTextFile('input.txt');

interface Motion {
    direction: string;
    steps: number;
}

interface Position {
    symbol: string;
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
const initialPosition =  { x: 0, y: 0 };
const start: Position = { ...initialPosition, symbol: 's' };
const head: Position = { ...initialPosition, symbol: 'H' };
const tail: Position[] = [
    head,
    {...initialPosition, symbol: '1'},
    {...initialPosition, symbol: '2'},
    {...initialPosition, symbol: '3'},
    {...initialPosition, symbol: '4'},
    {...initialPosition, symbol: '5'},
    {...initialPosition, symbol: '6'},
    {...initialPosition, symbol: '7'},
    {...initialPosition, symbol: '8'},
    {...initialPosition, symbol: '9'},
];

const printGrid = (grid: string[][]): void => grid.forEach((row) => console.log(row.join(' '), row.length));

const prependRow = () => {
    const row = Array.from({ length: grid[0].length }, () => '.');
    grid.unshift([...row]);
    visitedPositions.unshift([...row]);
    start.y++;
    head.y++;
    for (let i = 1; i < tail.length; i++) {
        tail[i].y++;
    }
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
    for (let i = 1; i < tail.length; i++) {
        tail[i].x++;
    }
};

const appendColumn = () => {
    for (let i = 0; i < grid.length; i++) {
        grid[i].push('.');
        visitedPositions[i].push('.');
    }
}

const moveKnots = (grid: string[][], head: Position): void => {
    grid[head.y][head.x] = '.';
    if (arePositionsEqual(head, start)) {
        grid[head.y][head.x] = 's';
    }

    for (let i = 1; i < tail.length; i++) {
        if (arePositionsEqual(head, tail[i])) {
            console.log(`tailsymbol: ${tail[i].symbol}`);
            grid[head.y][head.x] = `${tail[i].symbol}`;
            return;
        }
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

        // move tail right
        for (let j = 1; j < tail.length; j++) {
            let diff = tail[j - 1].x - tail[j].x;
            if (Math.abs(diff) > 1) {
                if (arePositionsEqual(tail[j-1], tail[j])) {
                    grid[tail[j].y][tail[j].x] = `${tail[j].symbol}`;
                } else if (arePositionsEqual(tail[j], start)) {
                    grid[tail[j].y][tail[j].x] = 's';
                } else {
                    grid[tail[j].y][tail[j].x] = '.';
                }

                if (diff > 0) {
                    tail[j].x++;
                } else if (diff < 0) {
                    tail[j].x--;
                }

                if (head.y - tail[j].y >= 1) { 
                    tail[j].y++;
                } else if (head.y - tail[j].y <= -1) {
                    tail[j].y--;
                }

                grid[tail[j].y][tail[j].x] = `${tail[j].symbol}`;
                if (tail[j].symbol === '9') {
                    visitedPositions[tail[j].y][tail[j].x] = '#';
                }
            }

            // move tail up
            diff = tail[j - 1].y - tail[j].y;
            if (Math.abs(diff) > 1) {
                if (arePositionsEqual(tail[j-1], tail[j])) {
                    grid[tail[j].y][tail[j].x] = `${tail[j].symbol}`;
                } else if (arePositionsEqual(tail[j], start)) {
                    grid[tail[j].y][tail[j].x] = 's';
                } else {
                    grid[tail[j].y][tail[j].x] = '.';
                }
                if (diff > 0) {
                    tail[j].y++;   
                } else if (diff < 0) {
                    tail[j].y--;
                }
                if (head.x - tail[j].x >= 1) {
                    tail[j].x++;
                } else if (head.x - tail[j].x <= -1) {
                    tail[j].x--;
                }

                grid[tail[j].y][tail[j].x] = `${tail[j].symbol}`;
                if (tail[j].symbol === '9') {
                    visitedPositions[tail[j].y][tail[j].x] = '#';
                }
            }

            // if (grid[tail[j].y][tail[j].x] === '.' || grid[tail[j].y][tail[j].x] === 's' || grid[tail[j].y][tail[j].x] !== 'H' && parseInt(tail[j].symbol) < parseInt(grid[tail[j].y][tail[j].x])) {
            //     grid[tail[j].y][tail[j].x] = `${tail[j].symbol}`;
            //     if (tail[j].symbol === '9') {
            //         visitedPositions[tail[j].y][tail[j].x] = '#';
            //     }
            // }
            

        }
        console.log(printGrid(grid));
    }
    
}

console.log(printGrid(grid));
console.log(printGrid(visitedPositions));

const numberOfVisitedPositions = visitedPositions.reduce((accumulator, row) => accumulator + row.reduce((rowAccumulator, position) => rowAccumulator + ((position === '#' || position === 's') ? 1 : 0), 0), 0);
console.log(numberOfVisitedPositions);