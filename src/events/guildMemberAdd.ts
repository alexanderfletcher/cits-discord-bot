import { IBotEvent, IBot } from "../interfaces";
import { Client, TextChannel, Message } from "discord.js";
import { BotMessage } from "../message";

export default class GuildMemberAdd implements IBotEvent {
  init(bot: IBot, client: Client): void {
    // In the future, it would be a good idea to retrieve the channel based on the id rather than the string
    client.on("guildMemberAdd", member => {
      const channel = member.guild.channels.find(
        ch => ch.name === "hangout"
      ) as TextChannel;

      if (!channel) return;

      const answer = new BotMessage(member.user);

      // Create an embed for our welcome message
      answer
        .setColor("#0864a5")
        .setTitle("Hello, world!")
        .setDescription(`Hey, ${member.user.username} 👋`)
        .addField("Hot tip", "Check out the rules at #overview")
        .setThumbnail(`${member.user.avatarURL}`)
        .setFooter("Joined", `${member.user.avatarURL}`)
        .setTimestamp(new Date());

      // Send our message and react to it
      channel.send({ embed: answer.richText }).then(message => {
        const msg = message as Message;
        msg.react("👋").catch(err => console.log(err));
      });
    });
  }
}
