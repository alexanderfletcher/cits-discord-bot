import * as Discord from "discord.js";

import { IBotEvent, IBot } from "../interfaces";

export default class Ready implements IBotEvent {
  public init(bot: IBot, client: Discord.Client) {
    client.on("ready", () => {
      client.user.setStatus("online");
      client.user
        .setPresence({
          game: { name: "vibin" },
          status: "online"
        })
        .catch(err => console.log(err));
      console.log("ready to go");
    });
  }
}
