interface Directory {
    name: string;
    content: Map<string, Directory | File>;
    superDirectory?: Directory;
    size: number;
}

interface File {
    name: string;
    size: number;
}

const isCommand = (line: string): boolean => line.startsWith('$');

const input = await Deno.readTextFile('input.txt');
const lines = input.split('\r\n');

const root: Directory = {
    name: '/',
    content: new Map<string, Directory | File>(),
    size: 0,
};
let currentDirectory: Directory = root;

lines.forEach((line) => {
    if (isCommand(line)) {
        const [_signifier, command, parameter] = line.split(' ');
        
        if (command === 'cd' && parameter) {
            if (parameter === '..' && currentDirectory?.superDirectory) {
                currentDirectory = currentDirectory.superDirectory;
                return;
            }
            if (parameter === '/') {
                currentDirectory = root;
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
                superDirectory: currentDirectory,
                size: 0,
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

const isEmptyDirectory = (item: Directory | File): boolean => 'content' in item && item.content.size === 0;
const isContentfulDirectory = (item: Directory | File): boolean => 'content' in item && item.content.size > 0;

const printDirectory = (directory: Directory, level = 0): void => {
    console.log(`${' '.repeat(level*2)}- ${directory.name} (dir)`);
    level++;
    for (const item of directory.content.values()) {
        if (isEmptyDirectory(item)) return;
        if (isContentfulDirectory(item)) {
            printDirectory(item as Directory, level);
        } else {
            console.log(`${' '.repeat(level*2)}- ${item.name} (file, size=${item.size})`);
        }
    }
};

const calculateSizeOfDirectory = (directory: Directory): {size: number, directories: Directory[]} => {
    let size = 0;
    const directories: Directory[] = [];

    for (const item of directory.content.values()) {
        if (isEmptyDirectory(item)) return { size: 0, directories: [] };
        if (isContentfulDirectory(item)) {
            const { size: directorySize, directories: intermediateDirectories } = calculateSizeOfDirectory(item as Directory);
            size += directorySize;
            directories.push(...intermediateDirectories);
        } else {
            size += item.size;
        }
    }

    directory.size = size;
    directories.push(directory);
    
    return { size, directories };
};

printDirectory(root);

const totalSpace = 70_000_000;
const requiredSpace = 30_000_000;
const { size: usedSpace, directories } = calculateSizeOfDirectory(root);
const availableSpace = totalSpace - usedSpace;
const neededSpace = requiredSpace - availableSpace;

let directoryToDelete = root;

for (const item of directories) {
    if (item.size >= neededSpace && item.size < directoryToDelete.size) {
        directoryToDelete = item;
    }
}

console.log(directoryToDelete.size);
