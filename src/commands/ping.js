export const command = "ping";
export const description = "Responds with 'pong' and checks response time.";
export const category = "utility"

export const run = async (bot, args, message) => {
    const t0 = Date.now();
    return message.reply("Pong!").then((m) => m.edit(`${m.content} (${Date.now() - t0}ms)`));
}