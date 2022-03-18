import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import cheerio, { CheerioAPI } from "cheerio";
import { IResponse } from "../types";
import { getRandomArtist } from "../utils/randomText";
import getData from "../utils/getData";
import sendResults from "../utils/actions/sendResults";

function recomendationsBotCommand(bot: Telegraf<Context<Update>>) {
  bot.hears("/recomedations", async (ctx, next) => {
    try {
      await ctx.replyWithDice();

      const { data }: IResponse = await getData(getRandomArtist());
      const $: CheerioAPI = cheerio.load(data);

      await sendResults($, ctx);
    } catch (error) {
      await ctx.reply("Something has gone wrong.");
    }
    return next();
  });

  bot.hears("/r", async (ctx, next) => {
    try {
      await ctx.reply("🔎");

      const { data }: IResponse = await getData(getRandomArtist());
      const $: CheerioAPI = cheerio.load(data);

      await sendResults($, ctx);
    } catch (error) {
      await ctx.reply("Something has gone wrong.");
    }
    return next();
  });
}

export { recomendationsBotCommand };
