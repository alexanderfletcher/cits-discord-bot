import * as Discord from "discord.js";

import config from "../../config.json";

import { IBotEvent, IBot } from "../interfaces";
import { BotMessage } from "../message";

export default class Message implements IBotEvent {
  public init(bot: IBot, client: Discord.Client) {
    client.on("message", async message => {
      if (message.author.bot) return;
      if (message.content.startsWith(config.prefix)) {
        const text = message.cleanContent;
        const member = message.guild.member(message.author);

        for (const cmd of bot._commands) {
          try {
            if (cmd.isValid(text) && cmd.hasPermissions(member)) {
              const answer = new BotMessage(message.author);
              await cmd.process(text, answer).catch(err => console.log(err));
              if (answer.isValid()) {
                message.channel
                  .send(answer.text || { embed: answer.richText })
                  .catch(err => console.log(err));
              }
            }
          } catch (exception) {
            console.log(exception);
          }
        }
      }
    });
  }
}
