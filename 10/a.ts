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
let signal = 0;
let currentInterval = 20;

for (const instruction of instructions) {
  const [command, parameter] = instruction.split(" ");
  const { requiredCycles, action } = instructionSet[command];

  for (let i = 0; i < requiredCycles; i++) {
    cycle++;
    if (cycle % currentInterval !== 0) continue;
    signal += X * cycle;
    currentInterval += 40;
  }
  action?.(parameter);
}

console.log(signal);
