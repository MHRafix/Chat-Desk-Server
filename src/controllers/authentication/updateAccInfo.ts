import { Request, Response } from "express";
import { generateToken } from "../../middleware/authentication";
import User from "../../models/User";

interface ISignupApiRes {
  _id?: string;
  user_name: string;
  user_email: string;
  user_role: boolean;
  user_pic: string;
  token: string | undefined;
}

export const updateAccInfo = async (
  req: Request,
  res: Response<ISignupApiRes>
): Promise<void> => {
  const { uid } = req.params;
  const newName: string = req.body.name;
  const newPic: string = req.body.pic;

  const user: any = await User.findOne({ _id: uid });

  if (newName) {
    user.user_name = newName;
  } else if (newPic) {
    user.user_pic = newPic;
  }

  await user.save();

  // res return
  res.status(200).json({
    _id: user._id,
    user_name: user.user_name,
    user_email: user.user_email,
    user_role: user.user_role,
    user_pic: user.user_pic,
    token: generateToken(user),
  });
};
