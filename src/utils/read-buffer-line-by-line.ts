import * as readline from "readline";
var stream = require('stream');
const events = require("events");

const readBufferLineByLine = async (buf: Buffer) => {
  var bufferStream = new stream.PassThrough();
  bufferStream.end(buf);

  const rl = readline.createInterface({
    input: bufferStream,
    crlfDelay: Infinity,
  });
  const result: string[] = [];
  rl.on("line", (line: string) => {
    result.push(line);
  });
  await events.once(rl, "close");
  return result;
};

export { readBufferLineByLine };
