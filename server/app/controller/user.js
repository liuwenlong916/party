// const Controller = require("egg").Controller;
const BaseController = require("./base");

class UserController extends BaseController {
  async info() {
    const { ctx } = this;
    const user_id = ctx.params.user_id;
    const user = await ctx.service.user.find(user_id);
    // ctx.body = user;
    this.success(user);
  }
}

module.exports = UserController;
