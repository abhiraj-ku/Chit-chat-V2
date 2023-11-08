const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message sent successfully" });
    } else {
      return res.json({ msg: "Failed to add to the database" });
    }
  } catch (ex) {
    next(ex);
  }
};

//get message controller
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
  } catch (ex) {
    next(ex);
  }
};
