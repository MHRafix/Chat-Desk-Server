import { Request, Response } from "express";
import User from "../../models/User";

interface IApiUser {
  _id?: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: boolean;
  user_pic: string;
}

export const allUsers = async (
  req: Request,
  res: Response<IApiUser[] | { error: string }>
): Promise<void> => {
  const users: IApiUser[] = await User.find({});

  if (users.length) {
    res.status(200).json(users);
  } else {
    res.status(202).json({ error: "No user found!" });
  }
};
