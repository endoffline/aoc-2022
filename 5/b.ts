const input = await Deno.readTextFile('input.txt');
const lines = input.split("\r\n");
const stacks: Map<number, string[]> = new Map<number, string[]>();

while(lines) {
    let line = lines.shift() as string;
    let index = 0;

    if (!line.trim().startsWith('[')) break;

    while(line) {
        index++;
        const crate = line.substring(1,2);
        line = line.substring(4);

        if (crate === ' ') continue;

        const stack = stacks.get(index) ?? [];
        stack.unshift(crate);
        stacks.set(index, stack);
    }
}

lines.shift();

for (const line of lines) {
    const instruction = [...line.matchAll(/\d+/g)].map(v  => parseInt(v[0]));
    
    const cratesToMove = [];
    for (let i = 0; i < instruction[0]; i++) {
        const crate = stacks.get(instruction[1])?.pop();

        if (!crate) continue;
        
        cratesToMove.unshift(crate);
    }
    stacks.get(instruction[2])?.push(...cratesToMove);
}   

const sortedStacks = new Map([...stacks.entries()].sort((a, b) => a[0] - b[0]));
let result = '';

for (const stack of sortedStacks.values()) {
    result = `${result}${stack.pop()}`;
}

console.log(result);
