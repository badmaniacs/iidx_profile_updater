import { parseInfo, parseAllSp, parseAllDp } from "./parser";

export class UserData {
  private djData = {};
  private scoreData = {};
  private ver: string;

  constructor(ver: string) {
    this.ver = ver;
  }

  async fetchInfo() {
    const djData = await parseInfo(this.ver);
    this.djData = { ...djData };
  }

  async fetchScoreData(setStatus) {
    const spData = await parseAllSp(this.ver, setStatus);
    const dpData = await parseAllDp(this.ver, setStatus);
    this.scoreData = { SP: [...spData], DP: [...dpData] };
  }

  getScoreData() {
    return this.scoreData;
  }

  getInfo() {
    return this.djData;
  }
}
