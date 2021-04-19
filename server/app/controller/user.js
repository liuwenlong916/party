// const Controller = require("egg").Controller;
const BaseController = require("./base");
const jwt = require("jsonwebtoken");

class UserController extends BaseController {
  async info() {
    const { ctx } = this;
    const user_id = ctx.params.user_id;
    console.log(user_id);
    const user = await ctx.service.user.findOne({ user_id });
    this.success(user);
  }
  async login() {
    const { ctx, app } = this;
    // const { user_code, password, captcha } = ctx.request.body;
    const user_code = ctx.params.user_code;
    // if (captcha.toUpperCase() != ctx.session.captcha.toUpperCase()) {
    //   this.error(-1, "验证码错误");
    //   return;
    // }
    const user = await ctx.service.user.findOne({ user_code });
    if (!user) {
      this.error(-1, "用户名错误");
      return;
    }
    const token = jwt.sign(
      {
        user_id: user.user.user_id,
        user_name: user.user.user_name,
      },
      app.config.jwt.secret,
      {
        expiresIn: "1h",
      }
    );
    console.log("jwt", token, user.user.user_name);
    this.success({ token, user_name: user.user.user_name, user_code });
  }
}

module.exports = UserController;
