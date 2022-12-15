const input = await Deno.readTextFile('input.txt');

const rucksacks = input.split('\r\n');

const findItemType = (rucksack: string): string => {
	const compartmentLength = rucksack.length / 2;
	for (let i = 0; i < compartmentLength; i++) {
		for (let j = compartmentLength; j < rucksack.length; j++) {
			if (rucksack[i] === rucksack[j]) return rucksack[i];
		}
	}
	return '';
};

const totalPriority = rucksacks.reduce((acc: number, rucksack: string) => {
	const itemType: string = findItemType(rucksack);
	const itemTypeAscii: number = itemType.charCodeAt(0);
	const priority: number = itemTypeAscii > 96 ? itemTypeAscii - 96 : itemTypeAscii - 64 + 26;
	return acc + priority;
}, 0);

console.log(totalPriority);
