const bcrypt = require("bcryptjs");
const useModel = require("../../models/userModels");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Vui lòng nhập Email");
    }
    if (!password) {
      throw new Error("Vui lòng nhập Mật Khẩu");
    }

    const user = await useModel.findOne({ email });

    if (!user) {
      throw new Error("Không tìm thấy tài khoản");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPass", checkPassword);
    if (checkPassword) {
      const TokenData = {
        _id: user._id,
        email: user.email,
      }
      const token = await jwt.sign(TokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
      const tokenOption = {
        httpOnly: true,
        secure: true
      }
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Đăng nhập thành công",
        data: token,
        success: true,
        error: false
      });
    } else {
      throw new Error("Vui lòng kiểm tra lại mật khẩu");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = userSignInController;