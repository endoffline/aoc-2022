const input = await Deno.readTextFile("input.txt");

const rucksacks: string[] = input.split("\r\n");

interface Group {
    backpack1: string;
    backpack2: string;
    backpack3: string;
}
const groups: Group[] = [];

while (rucksacks.length > 2) {    
    groups.push({backpack1: rucksacks.shift() as string, backpack2: rucksacks.shift() as string, backpack3: rucksacks.shift() as string});
}

const findItemType = (backpack1: string, backpack2: string): string => {
    let commonItemTypes = '';
    for (const itemType1 of backpack1) {
        for (const itemType2 of backpack2) {
            if (itemType1 === itemType2) {
                commonItemTypes+=itemType1;
            }
        }
    }
    return commonItemTypes;
};

const findBadge = ({backpack1, backpack2, backpack3}: Group): string => {
    const badgeCandidates = findItemType(backpack1, backpack2);
    return findItemType(backpack3, badgeCandidates);
}

const totalPriority = groups.reduce((acc: number, group: Group): number => {
    const badge: string = findBadge(group);
    const badgeAscii: number = badge.charCodeAt(0);
    const priority: number = badgeAscii > 96 ? badgeAscii - 96 : badgeAscii - 64 + 26;
    return acc+priority;
}, 0);

console.log(totalPriority);