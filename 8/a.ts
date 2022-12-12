const input = await Deno.readTextFile('input.txt');

const grid: number[][] = input.split('\r\n').map((line) => line.split('').map((value) => parseInt(value)));

const visibleTrees: number[][] = Array.from({length: grid.length}, () => Array.from({length: grid[0].length}, () => 0));


for (let i = 0; i < grid.length; i++) {
    let left = grid[i][0];
    visibleTrees[i][0] = 1;
    for (let j = 1; j < grid[i].length; j++) { 
        if (left < grid[i][j]) {
            visibleTrees[i][j] = 1;
            left = grid[i][j];
        }
    }

    let right = grid[i][grid[i].length-1];
    visibleTrees[i][grid[i].length-1] = 1;
    for (let j = grid[i].length-1; j >= 0; j--) {
        if (right < grid[i][j]) {
            visibleTrees[i][j] = 1;
            right = grid[i][j];
        }
    }
}

for (let j = 0; j < grid[0].length; j++) {
    let top = grid[0][j];
    visibleTrees[0][j] = 1;
    for (let i = 1; i < grid.length; i++) { 
        if (top < grid[i][j]) {
            visibleTrees[i][j] = 1;
            top = grid[i][j];
        }
    }
    
    let bottom = grid[grid.length-1][j];
    visibleTrees[grid.length-1][j] = 1;
    for (let i = grid.length-1; i >= 0; i--) {
        if (bottom < grid[i][j]) {
            visibleTrees[i][j] = 1;
            bottom = grid[i][j];
        }
    }
}

console.log(grid);
console.log(visibleTrees);

const numberOfVisibleTrees = visibleTrees.reduce((accumulator, gridRow) => accumulator + gridRow.reduce((rowAccumulator, tree) => rowAccumulator + tree, 0), 0);
console.log(numberOfVisibleTrees);
