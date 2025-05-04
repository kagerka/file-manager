import { arch, cpus, EOL, homedir, userInfo } from "node:os";
import { OS, OS_ARCHITECTURE, OS_CPUS, OS_EOL, OS_HOMEDIR, OS_USERNAME } from "../../common/commands.js";
import { ADD_COMMAND } from "../../common/constants.js";

export const os = async (command, args) => {
  if (command !== OS || args.length !== 1) {
    console.error(ADD_COMMAND);
    return;
  }
  const flag = args.join("");
  if (flag === OS_EOL || flag === OS_CPUS || flag === OS_HOMEDIR || flag === OS_USERNAME || flag === OS_ARCHITECTURE) {
    switch (flag) {
      case OS_EOL:
        const eolInfo = JSON.stringify(EOL);
        console.log(`Default system End-Of-Line: ${eolInfo}`);
        break;
      case OS_CPUS:
        const cpusInfo = cpus();
        console.log(`\n--- Host machine CPUs info ---\n`);
        console.log(`Amount of CPUS: ${cpusInfo.length}\n`);
        const data = cpusInfo.map((el) => ({
          Model: el.model,
          "Speed (GHz)": el.speed / 1000,
        }));
        console.table(data);
        break;
      case OS_HOMEDIR:
        const homeDir = homedir();
        console.log(`Home directory: ${JSON.stringify(homeDir)}`);
        break;
      case OS_USERNAME:
        const username = userInfo().username;
        console.log(`Current system user name: ${JSON.stringify(username)}`);
        break;
      case OS_ARCHITECTURE:
        const architecture = arch();
        console.log(`CPU architecture: ${JSON.stringify(architecture)}`);
        break;

      default:
        break;
    }
  } else {
    console.error(ADD_COMMAND);
  }
};
