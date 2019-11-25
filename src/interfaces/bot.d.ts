import { GuildMember, Client } from "discord.js";
import { IUser } from "./user";

export interface IBot {
  readonly _commands: IBotCommand[];
  readonly _events: IBotEvent[];
  start(commands: string, events: string): void;
}

export interface IBotCommand {
  help(): IBotCommandHelp;
  isValid(msg: string): boolean;
  hasPermissions(member: GuildMember): boolean;
  process(msg: string, answer: IBotMessage): Promise<void>;
}

export interface IBotCommandHelp {
  caption: string;
  description: string;
}

export interface IBotEvent {
  init(bot: IBot, client: Client): void;
}

export interface IBotMessage {
  readonly user: IUser;
  setTextOnly(text: string): IBotMessage;
  addField(name: string, value: string): IBotMessage;
  addBlankField(): IBotMessage;
  setColor(color: MessageColor): IBotMessage;
  setDescription(description: string): IBotMessage;
  setFooter(text: string, icon?: string): IBotMessage;
  setImage(url: string): IBotMessage;
  setThumbnail(url: string): IBotMessage;
  setTitle(title: string): IBotMessage;
  setURL(url: string): IBotMessage;
  setTimestamp(timestamp?: number | Date | undefined): IBotMessage;
}
