const input = await Deno.readTextFile('input.txt');

const lines = input.split("\r\n");

const stacks: Map<number, string[]> = new Map<number, string[]>();

while(lines) {
    let line = lines.shift() as string;
    let index = 0;
    console.log(stacks);
    if (!line) break;
    while(line) {
        index++;
        const crate = line.substring(1,2);
        line = line.substring(4);
        if (crate === ' ') continue;
        const stack = stacks.get(index) ?? [];
        stack.push(crate);
        stacks.set(index, stack);
    }
}

console.log(stacks);