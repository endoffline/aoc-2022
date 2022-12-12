interface Directory {
    name: string;
    content: Map<string, Directory | File>;
    parent?: Directory;
}

interface File {
    name: string;
    size: number;
}

const isCommand = (line: string): boolean => line.startsWith('$');

const input = await Deno.readTextFile('input.txt');
const lines = input.split('\r\n');

const fileSystem: Directory = {
    name: '/',
    content: new Map<string, Directory | File>(),
};
let currentDirectory: Directory = fileSystem;

lines.forEach((line) => {
    if (isCommand(line)) {
        const [_signifier, command, parameter, ..._rest] = line.split(' ');
        
        if (command === 'cd' && parameter) {
            if (parameter === '..' && currentDirectory?.parent) {
                currentDirectory = currentDirectory.parent;
                return;
            }
            if (parameter === '/') {
                currentDirectory = fileSystem;
                return;
            } 
            currentDirectory = currentDirectory.content.get(parameter) as Directory;
        }
    } else {
        const [first, second] = line.split(' ');

        if (first === 'dir') {
            const directory: Directory = {
                name: second,
                content: new Map<string, Directory | File>(),
                parent: currentDirectory,
            };
            currentDirectory.content.set(directory.name, directory);
        } else if (!isNaN(parseInt(first))) {
            const file: File = {
                name: second,
                size: parseInt(first),
            }
            currentDirectory.content.set(file.name, file);
        }
    }
});

const isFile = (item: Directory | File): boolean => 'size' in item;
const isEmptyDirectory = (item: Directory | File): boolean => 'content' in item && item.content.size === 0;
const isContentfulDirectory = (item: Directory | File): boolean => 'content' in item && item.content.size > 0;

const printDirectory = (directory: Directory, level = 0): void => {
    console.log(`${' '.repeat(level*2)}- ${directory.name} (dir)`);
    level++;
    for (const item of directory.content.values()) {
        if (isEmptyDirectory(item)) return;
        if (isContentfulDirectory(item)) {
            printDirectory(item as Directory, level);
        } else if ('size' in item) {
            console.log(`${' '.repeat(level*2)}- ${item.name} (file, size=${item.size})`);
        }
    }
};

printDirectory(fileSystem);

const calculateSizeOfDirectory = (directory: Directory, directorySizes: number[]): number => {
    let size = 0;
    let currentSize = 0;
    for (const item of directory.content.values()) {
        if (isEmptyDirectory(item)) return 0;
        if (isContentfulDirectory(item)) {
            size += calculateSizeOfDirectory(item as Directory, directorySizes);
        } else if ('size' in item) {
            currentSize += item.size; 
        }
    } 

    size += currentSize;
    console.log(`${directory.name} (dir) ${size}`);
    directorySizes.push(size);
    
    return size;
};

const directorySizes: number[] = [];
calculateSizeOfDirectory(fileSystem, directorySizes); 
console.log(directorySizes.reduce((total, size) => total+= size < 100_000 ? size : 0, 0)); 