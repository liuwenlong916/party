const Service = require("egg").Service;
class UserService extends Service {
  async find(user_id) {
    console.log(user_id);
    const user = await this.app.mysql.get("tbl_widm_user", { user_id });

    return { user };
  }
}
module.exports = UserService;
