const input = await Deno.readTextFile("input.txt");

const [stackInput, instructionInput] = input.split("\r\n\r\n");
const stackLines = stackInput.split("\r\n");
const instructions = instructionInput.split("\r\n");
const stacks: Map<number, string[]> = new Map<number, string[]>();

while (stackLines) {
  let line = stackLines.shift() as string;
  let index = 0;

  if (!line.trim().startsWith("[")) break;

  while (line) {
    index++;
    const crate = line.substring(1, 2);
    line = line.substring(4);

    if (crate === " ") continue;

    const stack = stacks.get(index) ?? [];
    stack.unshift(crate);
    stacks.set(index, stack);
  }
}

for (const line of instructions) {
  const [quantity, from, to] = [...line.matchAll(/\d+/g)].map((v) =>
    parseInt(v[0])
  );

  for (let i = 0; i < quantity; i++) {
    const crate = stacks.get(from)?.pop();

    if (!crate) continue;

    stacks.get(to)?.push(crate);
  }
}

const sortedStacks = new Map([...stacks.entries()].sort((a, b) => a[0] - b[0]));
let result = "";

for (const stack of sortedStacks.values()) {
  result = `${result}${stack.pop()}`;
}

console.log(result);
