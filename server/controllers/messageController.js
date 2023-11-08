// const messageModel = require("../model/messageModel");
// module.exports.addMessage = async (req, res, next) => {
//   try {
//     const { from, to, message } = req.body;

//     const data = await messageModel.create({
//       message: { text: message },
//       users: [from, to],
//       sender: from,
//     });
//     // console.log(data);
//     if (data) return res.json({ msg: "message send succesfully" });
//     return res.json({ msg: "failed to add to db" });
//   } catch (ex) {
//     next(ex);
//   }
// };

const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    // Correct way to create a message document
    const data = await messageModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });

    if (data) {
      console.log(data);
      return res.json({ msg: "Message sent successfully" });
    } else {
      return res.json({ msg: "Failed to add to the database" });
    }
  } catch (ex) {
    next(ex);
  }
};
