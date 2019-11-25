import Bot from "./bot";

new Bot().start(`${__dirname}/commands`, `${__dirname}/events`);
