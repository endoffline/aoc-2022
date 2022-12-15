const input = await Deno.readTextFile('input.txt');

const grid: number[][] = input.split('\r\n').map((line) =>
	line.split('').map((value) => parseInt(value))
);

const initializeBlankGrid = (lengthX: number, lengthY: number): number[][] =>
	Array.from(
		{ length: lengthX },
		() => Array.from({ length: lengthY }, () => 0),
	);

const measureScenicScore = (
	grid: number[][],
	posY: number,
	posX: number,
): number => {
	const center = grid[posY][posX];
	let right = 0, left = 0, bottom = 0, top = 0;

	for (let j = posX + 1; j < grid[posY].length; j++) {
		right++;
		if (center <= grid[posY][j]) break;
	}

	for (let j = posX - 1; j >= 0; j--) {
		left++;
		if (center <= grid[posY][j]) break;
	}

	for (let i = posY + 1; i < grid.length; i++) {
		bottom++;
		if (center <= grid[i][posX]) break;
	}

	for (let i = posY - 1; i >= 0; i--) {
		top++;
		if (center <= grid[i][posX]) break;
	}

	return top * right * bottom * left;
};

const scenicScores: number[][] = initializeBlankGrid(
	grid.length,
	grid[0].length,
);

for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
		scenicScores[i][j] = measureScenicScore(grid, i, j);
	}
}

const highestScenicScore = Math.max(...scenicScores.flat());
console.log(highestScenicScore);
