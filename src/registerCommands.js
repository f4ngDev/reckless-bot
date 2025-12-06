import { Client } from "@nerimity/nerimity.js";
import { commands, setupCommands } from "./commands.js";
import dotenv from "dotenv";
await setupCommands();
dotenv.config();

const client = new Client();

client.updateCommands(process.env.TOKEN, [
    ...commands.map((command) => ({
        name: command.command,
        description: command.description,
        ...(command.args ? { args: command.args } : {}),
        ...(command.permissions ? { permissions: command.permissions } : {})

    }))
]).then((res) => {
    if (!res?.status) {
        console.log(res);
        process.exit(1);
    }
    console.log("Commands registered!");
    process.exit(0);
})