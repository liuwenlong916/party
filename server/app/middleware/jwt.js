const jwt = require("jsonwebtoken");
module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = {
        code: "-2",
        msg: "用户没有登陆",
      };
      return;
    }
    const token = ctx.request.header.authorization.replace("Bearer ", "");
    try {
      const res = jwt.verify(token, app.config.jwt.secret);
      ctx.state.user_name = res.user_name;
      await next();
    } catch (e) {
      if ((e.name = "TokenExpiredError")) {
        ctx.body = {
          code: "-2",
          msg: "登陆过期",
        };
      } else {
        ctx.body = {
          code: "-2",
          msg: "用户信息错误",
        };
      }
    }
  };
};
