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
// interface ISignupApiRes {
// 	_id?: string;
// 	user_name: string;
// 	user_email: string;
// 	user_role: boolean;
// 	user_pic: string;
// 	success: string;
// 	token: string | undefined;
// }
export const updateAccInfo = async (
  req: Request,
  res: Response<any | { error: string }>
) => {
  const { uid } = req.params;
  const newName: string = req.body.name;
  const user: any = await User.findOne({ _id: uid });
  user.user_name = newName;

  await user.save();
  // make the jwt token with new details of user
  res.status(202).json({ success: "User name successfully updated!" });
  // if (user) {
  // 	console.log(data);
  // }
  // if (user) {
  // 	res.status(200).json(user);
  // } else {
  // res.status(400).json({ error: 'No user found!' });
  // }
};
