const Controller = require("egg").Controller;

//定义基类，封装规范。
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      errCode: 0,
      errMsg: "",
      data,
    };
  }
  message(msg) {
    this.ctx.body = {
      errCode: 0,
      errMsg: msg,
    };
  }
  error(code = -1, msg, error = {}) {
    this.ctx.body = {
      errCode: code,
      errMsg: msg,
      data: error,
    };
  }
}

module.exports = BaseController;
