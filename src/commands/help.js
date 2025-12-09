import { Client, Events } from "@nerimity/nerimity.js";
import { commands, setupCommands } from "../commands.js";

export const command = "help";
export const description = "Provides a list of available commands.";
export const category = "utility";

export const run = async (bot, args, message) => {
  const client = new Client();
  setupCommands(client);
  const commandList = commands
    .map((cmd) => {
      console.log(cmd);
      return `- **${cmd.command}**: ${
        cmd.description || "No description available."
      }`;
    })
    .join("\n");
  const html = `
  <div style="font-family: monospace; background-color:#1F1B1B; padding:10px; border-radius:8px; color:#fff;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:6px;">Available Commands</div>
  ${commandList}
</div>
`;
  await message.reply(undefined, { htmlEmbed: html });
};
