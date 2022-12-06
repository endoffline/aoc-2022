/**
 *          Symbols Points
 * Rock:    A       1
 * Paper:   B       2
 * Scissor: C       3
 *          
 *          Symbols Points
 * Lost:    X       0
 * Draw:    Y       3
 * Won:     Z       6
 * 
 * Score: (My symbol) + (outcome of round)
 */


const input = await Deno.readTextFile("input.txt");

const games: string[][] = input.split(/\r\n/).map((symbols: string) => symbols.split(' '));

const gameTable: { [outcome: string]: { [opponent: string]: number, points: number } } = {
    'X': {
        points: 0,
        'A': 3,
        'B': 1,
        'C': 2,
    },
    'Y': {
        points: 3,
        'A': 1,
        'B': 2,
        'C': 3,
    },
    'Z': {
        points: 6,
        'A': 2,
        'B': 3,
        'C': 1,
    },
}

const score = games.reduce((acc: number, [opponent, outcome]: string[]) => acc+gameTable[outcome][opponent]+gameTable[outcome].points, 0);

console.log(score);