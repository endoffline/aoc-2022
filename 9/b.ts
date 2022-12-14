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
const rope: Position[] = [
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
    for (let i = 1; i < rope.length; i++) {
        rope[i].y++;
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
    for (let i = 1; i < rope.length; i++) {
        rope[i].x++;
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

    for (let i = 1; i < rope.length; i++) {
        if (arePositionsEqual(head, rope[i])) {
            grid[head.y][head.x] = `${rope[i].symbol}`;
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
        } else if (direction === 'L') {
            if (head.x - 1 < 0) {
                prependColumn();
            }

            grid[head.y][head.x - 1] = 'H';
            moveKnots(grid, head);
            head.x--;
        } else if (direction === 'U') {
            if (head.y - 1 < 0) {
                prependRow();
            }

            grid[head.y -1][head.x] = 'H';
            moveKnots(grid, head);
            head.y--;
        } else if (direction === 'D') {
            if (grid.length <= head.y + 1) {
                appendRow();
            }

            grid[head.y + 1][head.x] = 'H';
            moveKnots(grid, head);
            head.y++;
        }
        let shouldSetStart = true;
        if (arePositionsEqual(head, start)) shouldSetStart = false;
        
        for (let j = 1; j < rope.length; j++) {
            const _head = rope[j - 1];
            const _tail = rope[j];
            const diffx = _head.x - _tail.x;
            const diffy = _head.y - _tail.y;

            if (!arePositionsEqual(_head, _tail)) {
                grid[_tail.y][_tail.x] = `${_tail.symbol}`;
            }

            if (Math.abs(diffx) > 1 || Math.abs(diffy) > 1) {
                if (!arePositionsEqual(_head, _tail)) {
                    grid[_tail.y][_tail.x] = '.';
                }
            }
            if (Math.abs(diffx) > 1) {
                _tail.x += (diffx > 0) ? 1 : -1;
                if (diffy !== 0) {
                    _tail.y += diffy > 0 ? 1 : -1;
                }
            } else if (Math.abs(diffy) > 1) {
                _tail.y += (diffy > 0) ? 1 : -1;
                if (diffx !== 0) {
                    _tail.x += diffx > 0 ? 1 : -1;
                }
            } 
            if (Math.abs(diffx) > 1 || Math.abs(diffy) > 1) {
                grid[_tail.y][_tail.x] = `${_tail.symbol}`;
                if (_tail.symbol === '9') {
                    visitedPositions[_tail.y][_tail.x] = '#';
                }
            }
            if (arePositionsEqual(_tail, start)) shouldSetStart = false;
        }
        if (shouldSetStart) grid[start.y][start.x] = 's';
    }
}

console.log(printGrid(grid));
console.log(printGrid(visitedPositions));

const numberOfVisitedPositions = visitedPositions.reduce((accumulator, row) => accumulator + row.reduce((rowAccumulator, position) => rowAccumulator + ((position === '#' || position === 's') ? 1 : 0), 0), 0);
console.log(numberOfVisitedPositions); //2651