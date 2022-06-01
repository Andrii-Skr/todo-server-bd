//import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import UserModel from "../Models/users-model";
import { v4 as uuidv4 } from "uuid";
import { sendAuthMail } from "./mail-service";
import TokenService from "../Services/token-service";
import { UserDto } from "../Dto/user-dto";
import usersModel from "../Models/users-model";
import { ApiError } from "../Exceptions/api-error";
import { MyPayload } from "src/Store/types";
//import { MyPayload } from "../Store/types";

class Authentication {
  async postRegistration(email: string, password: string) {
    const checkUser: any = await UserModel.findOne({ email });

    if (checkUser) {
      throw ApiError.badRequest(`message: ${email} already used`);
    }
    const hashPass = bcrypt.hashSync(password, 4);
    const activationLink = uuidv4();
    const user = await UserModel.create({
      email,
      password: hashPass,
      ActivatedLink: activationLink,
    });
    await sendAuthMail(email, `${process.env.Api_Url}auth/activation/${activationLink}`).catch(
      console.error
    );

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getActivation(ActivatedLink: string) {
    const user = await usersModel.findOne({ ActivatedLink });
    if (!user) {
      throw ApiError.badRequest("Couldn't find activation link");
    }
    user.isActivated = true;
    user.ActivatedLink = undefined;
    user.save();
  }
  async postLogin(email: string, password: string) {
    const checkUser: any = await usersModel.findOne({ email });
    if (!checkUser) {
      throw ApiError.badRequest("User name or password incorrect =(");
    }
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (!checkPassword) {
      throw ApiError.badRequest("User name or password incorrect =(");
    }
    const userDto = new UserDto(checkUser);
    const tokens = TokenService.generateToken({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async postLogout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async getRefresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.authorizationError();
    }
    //@ts-ignore
    const userData: string | MyPayload = TokenService.checkRefreshToken(refreshToken) as
      | string
      | MyPayload;
    if (typeof userData === "string") {
      throw ApiError.authorizationError();
    }
    const DbToken = TokenService.findToken(userData.id);
    if (!userData || !DbToken) {
      throw ApiError.authorizationError();
    }
    const user = await usersModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new Authentication();
