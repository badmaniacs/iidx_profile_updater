import axios, { AxiosInstance, AxiosResponse } from "axios";
import { mode } from "./scraper/type";

export interface User {
  username: string;
  id: number;
}

class IidxApi {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: "https://p.eagate.573.jp/game/2dx/",
    });
  }

  async getStatus(ver: string) {
    return this.client.get(`/${ver}/djdata/status.html`);
  }

  async getScore(ver: string, level: number, mode: mode, offset: number) {
    switch (mode) {
      case "SP":
        return this.client.get(
          `/${ver}/djdata/music/difficulty.html?difficult=${level}&style=0&disp=1&offset=${offset}`
        );
      case "DP":
        return this.client.get(
          `/${ver}/djdata/music/difficulty.html?difficult=${level}&style=1&disp=1&offset=${offset}`
        );
    }
  }
}

export const iidxApi = new IidxApi();

class ServerApi {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000/",
    });
  }

  async createProfile(data) {
    return this.client.post("/profiles", data);
  }

  async validatePass(uuid: string): Promise<AxiosResponse<User, unknown>> {
    return this.client.get("/users/pass", {
      params: { uuid: uuid },
    });
  }

  async deletePass(uuid: string) {
    return this.client.delete("/users/pass", {
      params: { uuid: uuid },
    });
  }

  async validateUser(data) {
    return this.client.post("/users/valid", data);
  }
}

export const serverApi = new ServerApi();
