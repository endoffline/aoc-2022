const input = await Deno.readTextFile("input.txt");

interface Assignment {
    min: number;
    max: number;
}

interface Pair {
    a: Assignment;
    b: Assignment;
}

const pairs = input.split("\r\n").map((pair: string) => {
    const arr = pair.split(',')
        .map((assignment: string) => { 
            const arr = assignment.split('-');
            return { min: parseInt(arr[0]), max: parseInt(arr[1])};
        });
    return {a: arr[0], b: arr[1]};
});

const fullyContains = (a: Assignment, b: Assignment): boolean => a.min <= b.min && b.max <= a.max;

const totalOverlaps = pairs.reduce((acc: number, pair: Pair) => {
    if (fullyContains(pair.a, pair.b)) return ++acc;
    if (fullyContains(pair.b, pair.a)) return ++acc;
    return acc;
}, 0);

console.log(totalOverlaps);
