const fs = require('fs').promises;

const [, , ...args] = process.argv;

async function countNoOfBytes(){
  try {
      const stats = await fs.stat('test.txt')
      console.log(stats.size)
  } catch (err) {
      console.log(err)
  }
}

async function countNoOfLines(){
  try {
      const data = await fs.readFile('test.txt', 'utf-8')
      const count = data.split('\n').length
      console.log(count)
  } catch (error) {
      console.log(error)
  }
}

async function countNoOfWords(){
  try {
      const data = await fs.readFile('test.txt', 'utf-8')
      const count = data.split(/\s+/).length
      console.log(count)
  } catch (error) {
      console.log(error)
  }
}

async function countNoOfChar(){
  try {
      const data = await fs.readFile('test.txt', 'utf-8')
      const count = data.split('').length
      console.log(count)
  } catch (error) {
      console.log(error)
  }
}

switch (args[0]) {
    case "-c":
      if (args.length !== 2 || args[0] !== "-c") {
        console.error("Usage: ccwc -c <file>");
        process.exit(1);
      }
      countNoOfBytes(args[1]);
      break;
    case "-l":
      if (args.length !== 2 || args[0] !== "-l") {
        console.error("Usage: ccwc -l <file>");
        process.exit(1);
      }
      countNoOfLines(args[1]);
      break;
    case "-w":
      if (args.length != 2 || args[0] !== "-w") {
        console.error("Usage: ccwc -w <file>");
        process.exit(1);
      }
      countNoOfWords(args[1]);
      break;
    case "-m":
      if (args.length != 2 || args[0] !== "-m") {
        console.error("Usage: ccwc -m <file>");
        process.exit(1);
      }
      countNoOfChar(args[1]);
      break;
    case "-version":
      if (args[0] === "-version") {
        console.log(`ccwc version:\n ${packageJson.version}`);
        process.exit(0);
      }
      break;
    case "-help":
      console.log(`Usage: ccwc [options] <file>
  
        Options:
          -c, --bytes    Print the byte counts
          -l, --lines    Print the newline counts
          -w  --words    Print the word counts
          -m, --chars    Print the character counts
        `);
      break;
    default:
      if (args.length !== 1) {
        console.error("Usage: ccwc -help");
        process.exit(1);
      }
      countNoOfBytes(args[0]);
      countNoOfLines(args[0]);
      countNoOfWords(args[0]);
      countNoOfChar(args[0]);
  }