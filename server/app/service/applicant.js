'use strict';
const Service = require('egg').Service;
class ApplicantService extends Service {
  async getPageList(params) {
    const { app } = this;
    const list = await app.mysql.select('tbl_dy_applicants', {
      // columns: [ 'app_id', 'app_name' ],
      ...params });
    return { list };
  }
}
module.exports = ApplicantService;
