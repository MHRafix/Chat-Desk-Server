import { Request, Response } from "express";
import Chat from "../../models/Chat";
import Message from "../../models/Message";
import User from "../../models/User";

/**
 *
 * @description    all messages of a speific chat
 * @route          get /api/v1/messages/:chat_id
 * @access         protected
 */

export const allMessages = async (
  req: Request,
  res: Response<any>
): Promise<void> => {
  const { chat_id } = req.params;

  try {
    const all_messages = await Message.find({
      chat: chat_id,
    })
      .populate("sender", "user_name user_email user_pic")
      .populate("chat");

    res.status(200).json(all_messages);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 *
 * @description    send message to a speific chat
 * @route          get /api/v1/messages/send_message/:uid
 * @access         protected
 */

export const sendMessage = async (req: Request, res: Response<any>) => {
  // config var
  const { uid } = req.params;
  const { content, chat_id }: { content: any; chat_id: string } = req.body;

  // validate the req content
  if (!content || !chat_id) {
    console.log("Invalid data passed into request!");
    return res.status(400);
  }

  // make new message data
  var newMessage = {
    sender: uid,
    content,
    chat: chat_id,
  };

  // send message
  try {
    var message: any = await Message.create(newMessage);
    message = await message.populate("sender", "user_name user_pic");

    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.user",
      select: "user_name, user_pic, user_email",
    });

    await Chat.findByIdAndUpdate(req.body.chat_id, {
      last_message: message,
    });

    res.status(200).json(message);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
