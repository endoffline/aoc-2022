const input = await Deno.readTextFile('input.txt');

const caloriesList: string[] = input.split(/\r\n/);

let currentElfsCalories = 0;
const fatElves: number[] = [0, 0, 0];

caloriesList.forEach((calories) => {
	if (!calories) currentElfsCalories = 0;
	currentElfsCalories += Number(calories);
	if (currentElfsCalories > fatElves[2]) fatElves[2] = currentElfsCalories;
	if (fatElves[2] > fatElves[1]) {
		[fatElves[1], fatElves[2]] = [fatElves[2], fatElves[1]];
	}
	if (fatElves[1] > fatElves[0]) {
		[fatElves[0], fatElves[1]] = [fatElves[1], fatElves[0]];
	}
});

console.log(fatElves.reduce((prev, curr) => prev + curr, 0));
