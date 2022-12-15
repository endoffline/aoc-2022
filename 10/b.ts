const input = await Deno.readTextFile("input.txt");
const instructions = input.split("\r\n");

const instructionSet: Record<
  string,
  { cycles: number; action?: (parameter: string) => void }
> = {
  "addx": {
    cycles: 2,
    action: (parameter: string): void => {
      X += parseInt(parameter);
    },
  },
  "noop": { cycles: 1 },
};
let X = 1;
let cycle = 0;
const newLine = 40;
let display = "";

for (const instruction of instructions) {
  const [identifier, parameter] = instruction.split(" ");
  const { cycles, action } = instructionSet[identifier];

  for (let i = 0; i < cycles; i++) {
    cycle++;

    if (X <= cycle && cycle < X + 3) {
      display += "#";
    } else {
      display += ".";
    }

    if (cycle % newLine === 0) {
      display += "\n";
      cycle = 0;
    }
  }
  action?.(parameter);
}

console.log(display);

// ####.####.####..##..#..#...##..##..###..
// #.......#.#....#..#.#..#....#.#..#.#..#.
// ###....#..###..#....####....#.#..#.###..
// #.....#...#....#....#..#....#.####.#..#.
// #....#....#....#..#.#..#.#..#.#..#.#..#.
// ####.####.#.....##..#..#..##..#..#.###..
