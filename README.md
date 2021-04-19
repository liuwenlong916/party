# 前端 front

# 后端接口 server

## 配置 mysql

```javascript
// 1.plugin.js
exports.mysql = {
  enable: true,
  package: "egg-mysql",
};
// 2.config.${evn}.js
exports.mysql = {
  // 单数据库信息配置，还可以配置链接多个数据库，详情看文档
  client: {
    // host
    host: "10.1.102.145",
    // 端口号
    port: "3306",
    // 用户名
    user: "root",
    // 密码
    password: "mysql.145.com",
    // 数据库名
    database: "db_widm",
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
//3. 使用
await app.mysql.query(sql, values);
//4. server层调用
// app/service/user.js
class UserService extends Service {
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get("tbl_dy_user", { user_id: 11 });
    return { user };
  }
}
```

## 封装 Controller 基类

其他 controller 类继承该基类 BaseController，不继承 Controller。

```javascript
//controller/base.js
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
```

## 路由传参

1. /user/:user_id => ctx.params.user_id 获取
2. /user?user_id = 1 => ctx.query.user_id 获取

## 鉴权 JWT
