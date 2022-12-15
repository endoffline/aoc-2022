const stream = await Deno.readTextFile('input.txt');

const sequenceSize = 14;
let startOfSequence = 0, i = sequenceSize;

while (!startOfSequence && i <= stream.length) {
	const window = new Set(stream.substring(i - sequenceSize, i).split(''));

	if (window.size === sequenceSize) {
		startOfSequence = i;
		break;
	}

	i++;
}

console.log(startOfSequence);
