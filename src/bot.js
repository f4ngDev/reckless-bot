import dotenv from "dotenv";
dotenv.config();

import { Client, Events } from "@nerimity/nerimity.js";
import { commands, setupCommands } from "./commands.js";

const reckless = new Client();
reckless.on(Events.Ready, () => {
  console.log(`Logged in as: ${reckless.user?.username}`);
});
setupCommands(reckless);

// running commands
reckless.on(Events.MessageCreate, async (message) => {
  // to stop bot shutting down when it responds to a command lol
  if (!message.command) {
    console.log("Message is not a command.");
    return;
  }

  const args = message.content?.split?.(" ") || [];

  const isCmd = message.command;
  if (isCmd) {
    const commandModule = commands.find(
      (c) => c.command === message.command.name
    );
    if (commandModule) {
      return commandModule.run(reckless, args, message);
    }
  }
});

reckless.login(process.env.TOKEN);
