'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async findOne(params) {
    const user = await this.app.mysql.get('tbl_widm_user', params);

    return { user };
  }
}
module.exports = UserService;
