import fs from "fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const commandFiles = await fs.readdir(__dirname + "/commands");

export let commands = [];
export const setupCommands = async (bot) => {
    commands = await Promise.all(
        commandFiles.map((file) => import(`./commands/${file}`))
    );
    commands.forEach((command) => {
        command.onLoad?.(bot);
    });
    console.log(commands);
}