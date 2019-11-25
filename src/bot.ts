import * as Discord from "discord.js";

import config from "../config.json";

import dotenv from "dotenv"

import { IBot, IBotCommand, IBotEvent } from "../src/interfaces";

export default class Bot implements IBot {
  readonly _commands: IBotCommand[] = [];
  readonly _events: IBotEvent[] = [];
  private _client: Discord.Client;

  public start(commands: string, events: string) {
    this.loadCommands(commands);
    this._client = new Discord.Client();
    this.loadEvents(events);

    dotenv.config();

    this._client.login(process.env.TOKEN);
  }

  private loadEvents(eventsPath: string) {
    if (config.events.length > 0) {
      for (const eventName of config.events) {
        const evtClass = require(`${eventsPath}/${eventName}`).default;
        const event = new evtClass() as IBotEvent;
        event.init(this, this._client);
        this._events.push(event);
      }
    } else {
      throw new Error("empty events list");
    }
  }

  private loadCommands(commandsPath: string) {
    if (config.commands.length > 0) {
      for (const commandName of config.commands) {
        const cmdClass = require(`${commandsPath}/${commandName}`).default;
        const command = new cmdClass() as IBotCommand;
        this._commands.push(command);
      }
    } else {
      throw new Error("empty commands list");
    }
  }
}
