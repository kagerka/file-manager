import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline";
import { displayCurrentDir } from "./src/utils/displayCurrentDir.js";
import { sayGoodbye } from "./src/utils/sayGoodbye.js";
import { sayHello } from "./src/utils/sayHello.js";

const app = async () => {
  await sayHello();
  await displayCurrentDir();

  const readline = createInterface({ input, output });

  readline.on("line", async (input) => {
    if (input.trim() === ".exit") {
      readline.close();
    } else {
      readline.prompt();
    }
  });

  readline.on("close", async () => {
    await sayGoodbye();
    process.exit(0);
  });
};

await app();
