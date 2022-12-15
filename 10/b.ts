const isSpriteInFrame = (cycle: number, spritePostion: number): boolean =>
  X <= cycle && cycle < X + 3;

const input = await Deno.readTextFile("input.txt");
const instructions = input.split("\r\n");

const instructionSet: Record<
  string,
  { requiredCycles: number; action?: (parameter: string) => void }
> = {
  "addx": {
    requiredCycles: 2,
    action: (parameter: string): void => {
      X += parseInt(parameter);
    },
  },
  "noop": { requiredCycles: 1 },
};

let X = 1;
let cycle = 0;
const newLine = 40;
let display = "";

for (const instruction of instructions) {
  const [command, parameter] = instruction.split(" ");
  const { requiredCycles, action } = instructionSet[command];

  for (let i = 0; i < requiredCycles; i++) {
    cycle++;

    display += isSpriteInFrame(cycle, X) ? "#" : ".";

    if (cycle % newLine !== 0) continue;
    display += "\n";
    cycle = 0;
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
