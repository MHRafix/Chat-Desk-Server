/**
 * authentication controller
 */

import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateToken } from "../../middleware/authentication";
import User from "../../models/User";

interface ISignupApiRes {
  _id?: string;
  user_name: string;
  user_email: string;
  user_role: boolean;
  user_pic: string;
  success: string;
  token: string | undefined;
}

interface IApiUser {
  _id?: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: boolean;
  user_pic: string;
}

interface ISigninApiResData {
  _id?: string;
  user_name: string;
  user_email: string;
  user_role: boolean;
  user_pic: string;
  success: string;
  token: string | undefined;
}
// interface ISignupApiUser {
// 	_id?: Types.ObjectId;
// 	user_name: string;
// 	user_email: string;
// 	user_password: string;
// 	user_role: boolean;
// 	user_pic: string;
// 	success: string;
// 	token: string | undefined;
// }
interface ISignupReq {
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: boolean;
  user_pic: string;
}

// signup api
export const userSignUp = async (
  req: Request,
  res: Response<ISignupApiRes | { error: string }>
): Promise<void> => {
  const {
    user_name,
    user_email,
    user_password,
    user_role,
    user_pic,
  }: ISignupReq = req?.body;

  console.log(req.body);
  const exist: IApiUser | null = await User.findOne({
    user_email: user_email,
  });

  if (exist) {
    res.status(202).json({ error: "User already exist. Please login!" });
  } else {
    // save user to database
    const newUser: any = await User.create({
      user_name: user_name,
      user_email: user_email,
      user_password: bcrypt.hashSync(user_password),
      user_role: user_role,
      user_pic: user_pic,
    });
    console.log(newUser);

    if (newUser) {
      // generate jwt token here
      const token: string = generateToken(newUser);
      console.log(token);

      res.status(200).json({
        _id: newUser._id,
        user_name: newUser.user_name,
        user_email: newUser.user_email,
        user_role: newUser.user_role,
        user_pic: newUser.user_pic,
        token,
        success: "Account successfully created!",
      });
    } else {
      res.status(202).json({ error: "Failed to create user!" });
    }
  }
};

// signin api
export const userSignin = async (
  req: Request,
  res: Response<ISigninApiResData | { error: string }>
): Promise<void> => {
  const { user_email, user_password } = req.body;
  const user: IApiUser | null = await User.findOne({
    user_email: user_email,
  });

  if (user) {
    const match: boolean = bcrypt.compareSync(
      user_password,
      user?.user_password
    );
    if (match) {
      // generate jwt token here
      const token: string = generateToken(user);
      res.status(200).json({
        token,
        _id: user._id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_role: user.user_role,
        user_pic: user.user_pic,
        success: "Login successfull!",
      });
    } else {
      res.status(202).json({ error: "Opps, incorrect password!" });
    }
  } else {
    res.status(202).json({ error: "Invalid email and password!" });
  }
};
