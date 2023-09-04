import * as cheerio from "cheerio";
import { iidxApi } from "../axios";
import { musicData, mode } from "./type";

const radarRegex = /[+-]?\d+(\.\d+)?/g;
const rankRegex = /score_icon\/(.+?)\.gif/;

const clearTypeStringParser = (src?: string) => {
  if (!src) {
    return "";
  }
  const clearTypeRegex = /score_icon\/(.+?)\.gif/;
  const srcName = src.match(clearTypeRegex)![1];
  switch (srcName) {
    case "clflg1":
      return "FAILED";
    case "clflg2":
      return "A-CLEAR";
    case "clflg3":
      return "E-CLEAR";
    case "clflg4":
      return "CLEAR";
    case "clflg5":
      return "H-CLEAR";
    case "clflg6":
      return "EXH-CLEAR";
    case "clflg7":
      return "F-COMBO";
    default:
      return "";
  }
};

export const parseInfo = async (ver: string) => {
  const info = await iidxApi.getStatus(ver);
  const infoArray = cheerio
    .load(info.data)(".dj-profile")
    .text()
    .split(" ")
    .filter((item) => item !== "");
  const anotherInfoArray = cheerio
    .load(info.data)(".dj-rank")
    .text()
    .split(" ")
    .filter((item) => item !== "");
  const qproImgUrl = cheerio.load(info.data)(".qpro-img img").attr("src");
  const djData = {
    djName: infoArray[2],
    region: infoArray[4],
    iidxId: infoArray[7],
    class: {
      SP: anotherInfoArray[26],
      DP: anotherInfoArray[28],
    },
    arena: {
      SP: anotherInfoArray[31],
      DP: anotherInfoArray[33],
    },
    radar: {
      SP: {
        NOTES: anotherInfoArray[2].match(radarRegex).toString(),
        CHORD: anotherInfoArray[3].match(radarRegex).toString(),
        PEAK: anotherInfoArray[4].match(radarRegex).toString(),
        CHARGE: anotherInfoArray[5].match(radarRegex).toString(),
        SCRATHCH: anotherInfoArray[6].match(radarRegex).toString(),
        SOFLAN: anotherInfoArray[7].match(radarRegex).toString(),
        TOTAL: anotherInfoArray[8].match(radarRegex).toString(),
      },
      DP: {
        NOTES: anotherInfoArray[10].match(radarRegex).toString(),
        CHORD: anotherInfoArray[11].match(radarRegex).toString(),
        PEAK: anotherInfoArray[12].match(radarRegex).toString(),
        CHARGE: anotherInfoArray[13].match(radarRegex).toString(),
        SCRATHCH: anotherInfoArray[14].match(radarRegex).toString(),
        SOFLAN: anotherInfoArray[15].match(radarRegex).toString(),
        TOTAL: anotherInfoArray[16].match(radarRegex).toString(),
      },
    },
    qpro: "https://p.eagate.573.jp/" + qproImgUrl,
    ver: parseInt(ver),
  };
  return djData;
};
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/

const scoreParser = async (
  ver: string,
  level: number,
  mode: mode,
  setStatus
) => {
  const scoreData: musicData[] = [];
  let offset = 0;
  while (true) {
    setStatus(
      `${mode}모드 레벨${level + 1} ${offset + 1}페이지의 데이터 로딩`
    );
    const score = await iidxApi.getScore(ver, level, mode, offset * 50);
    const $ = cheerio.load(score.data);
    const html = cheerio.load(score.data)(".series-difficulty").html();
    if (html === null) {
      break;
    }
    const tableData = cheerio
      .load(html as string)("tbody tr")
      .slice(2);
    tableData.each((i, item) => {
      const music_name = $(item).find("td:first-child a").text().trim();
      const difficulty = $(item).find("td:nth-child(2)").text().trim();
      const rank = $(item)
        .find("td:nth-child(3) img")
        .attr("src")
        ?.trim()
        .match(rankRegex);
      const score = $(item).find("td:nth-child(4)").text().trim();
      const clear_type = $(item)
        .find("td:nth-child(5) img")
        .attr("src")
        ?.trim();
      scoreData.push({
        music_name,
        level: level + 1,
        difficulty,
        rank: rank![1],
        score,
        clear_type: clearTypeStringParser(clear_type),
        play_type: mode,
      });
    });
    offset++;
  }
  return scoreData;
};

export const parseAllSp = async (ver: string, setStatus) => {
  const scoreArray: musicData[] = [];
  for (let level = 0; level <= 11; level++) {
    const data = await scoreParser(ver, level, "SP", setStatus);
    scoreArray.push(...data);
  }
  return scoreArray;
};

export const parseAllDp = async (ver: string, setStatus) => {
  const scoreArray: musicData[] = [];
  for (let level = 0; level <= 11; level++) {
    const data = await scoreParser(ver, level, "DP", setStatus);
    scoreArray.push(...data);
  }
  return scoreArray;
};
