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
let signal = 0;
let currentInterval = 20;

for (const instruction of instructions) {
  const [identifier, parameter] = instruction.split(" ");
  const { cycles, action } = instructionSet[identifier];

  for (let i = 0; i < cycles; i++) {
    cycle++;
    if (cycle % currentInterval === 0) {
      signal += X * cycle;
      currentInterval += 40;
    }
  }
  action?.(parameter);
}

console.log(signal);
