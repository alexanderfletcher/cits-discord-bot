import * as Discord from "discord.js";

import { Permissions } from "../../enum";

import { IBotCommand, IBotCommandHelp, IBotMessage } from "../interfaces";

/**
 * Use this command as a base for creating new commands
 */
export default class Ping implements IBotCommand {
  private readonly CMD_REGEXP = /^.\/(ping)(?: |$)/im;
  private readonly PERMISSIONS: Discord.PermissionResolvable = [Permissions.SEND_MESSAGES]

  // help message to display for a given command
  public help(): IBotCommandHelp {
    return {
      caption: "ping/pong",
      description: "the most basic command"
    };
  }

  // check if the command is valid
  public isValid(msg: string): boolean {
    return this.CMD_REGEXP.test(msg);
  }

  // check if the user has permissions to execute this command
  public hasPermissions(member: Discord.GuildMember) {
    if(member.hasPermission(this.PERMISSIONS)) {
      return true;
    }
    return false;
  }

  // process the command
  public async process(msg: string, answer: IBotMessage): Promise<void> {
    answer.setTextOnly("pong");
  }
}
