const input = await Deno.readTextFile("input.txt");

const caloriesList: string[] = input.split(/\r\n/);

let currentElfsCalories = 0;
let fattestElf: number = currentElfsCalories;

caloriesList.forEach((calories) => {
    if (!calories) currentElfsCalories = 0;
    currentElfsCalories+=Number(calories);
    if (currentElfsCalories>fattestElf) fattestElf = currentElfsCalories;
})

console.log(fattestElf);

