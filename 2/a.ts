/**
 *          Symbols Points
 * Rock:    A | X   1
 * Paper:   B | Y   2
 * Scissor: C | Z   3
 *          
 *          Points
 * Lost:    0
 * Draw:    3
 * Won:     6
 * 
 * Score: (My symbol) + (outcome of round)
 */


const input = await Deno.readTextFile("input.txt");

const games: number[][] = input.split(/\r\n/).map((symbols: string) => symbols.split(' ').map((symbol: string) => ((symbol.charCodeAt(0) < 70) ? symbol.charCodeAt(0) - 64 : symbol.charCodeAt(0) - 87)));

const gameTable: { [key: number]: number } = {
    1: 3,
    2: 1,
    3: 2,
}

const score = games.reduce((acc: number, [a, b]: number[]) => {
    acc+=b;
    if (gameTable[b] === a) return acc+=6;
    if (b === a) return acc+=3;
    return acc;
}, 0);

console.log(score);