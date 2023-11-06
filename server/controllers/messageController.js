const Message = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "message send succesfully" });
    return res.json({ msg: "failed to add to db" });
  } catch (ex) {
    next(ex);
  }
};
