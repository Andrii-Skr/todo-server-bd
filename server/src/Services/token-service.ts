import jwt from "jsonwebtoken";
import { Payload } from "../Store/types";
import tokenModel from "../Models/token-model";

class TokenService {
  generateToken(payload: Payload) {
    if (!process.env.JWT_AccessKey) {
      throw new Error("A_Key NOT DEFINED");
    }
    if (!process.env.JWT_RefreshKey) {
      throw new Error("R_Key NOT DEFINED");
    }
    const accessToken = jwt.sign(payload, process.env.JWT_AccessKey, { expiresIn: "24h" });
    const refreshToken = jwt.sign(payload, process.env.JWT_RefreshKey, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }
  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const firstToken = await tokenModel.create({ userId, refreshToken });
    return firstToken;
  }

  async removeToken(refreshToken: string) {
    await tokenModel.deleteOne({ refreshToken });
  }

  checkRefreshToken(refreshToken: string) {
    if (!process.env.JWT_RefreshKey) {
      throw new Error("R_Key NOT DEFINED");
    }
    const token = jwt.verify(refreshToken, process.env.JWT_RefreshKey);
    return token;
  }
  checkAccessToken(accessToken: string) {
    if (!process.env.JWT_AccessKey) {
      throw new Error("A_Key NOT DEFINED");
    }
    const token = jwt.verify(accessToken, process.env.JWT_AccessKey);
    return token;
  }
  async findToken(token: string) {
    console.log(token);
    const DbToken = await tokenModel.findOne({ userId: token });
    console.log(DbToken);
    return DbToken;
  }
}

export default new TokenService();
