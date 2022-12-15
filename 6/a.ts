const stream = await Deno.readTextFile("input.txt");

let startOfPacket = 0;
for (let i = 4; i <= stream.length; i++) {
  const window = new Set(stream.substring(i - 4, i).split(""));
  if (window.size === 4) {
    startOfPacket = i;
    break;
  }
}

console.log(startOfPacket);
