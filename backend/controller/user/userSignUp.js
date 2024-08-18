const useModel = require("../../models/userModels");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await useModel.findOne({ email });
    console.log("user", user);

    if (user) {
      throw new Error("Người dùng đã tồn tại");
    }

    if (!email) {
      throw new Error("Vui lòng nhập Email");
    }
    if (!password) {
      throw new Error("Vui lòng nhập Mật Khẩu");
    }
    if (!name) {
      throw new Error("Vui lòng nhập Tên");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role : "GENERAL",
      password: hashPassword,
    };

    const userData = new useModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "Tài khoản đã được tạo",
    });
  } catch (err) {
    console.log("err",err.message)
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;