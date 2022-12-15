const input = await Deno.readTextFile('input.txt');

interface Assignment {
	min: number;
	max: number;
}

interface Pair {
	a: Assignment;
	b: Assignment;
}

const pairs = input.split('\r\n').map((pair: string) => {
	const arr = pair.split(',')
		.map((assignment: string) => {
			const arr = assignment.split('-');
			return { min: parseInt(arr[0]), max: parseInt(arr[1]) };
		});
	return { a: arr[0], b: arr[1] };
});

const doOverlap = (a: Assignment, b: Assignment): boolean => a.min <= b.max && b.min <= a.max;

const totalOverlaps = pairs.reduce((acc: number, pair: Pair) => {
	if (doOverlap(pair.a, pair.b)) return ++acc;
	if (doOverlap(pair.b, pair.a)) return ++acc;
	return acc;
}, 0);

console.log(totalOverlaps);
