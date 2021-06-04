'use strict';
const BaseController = require('./base');
module.exports = class ApplicantController extends BaseController {
  /**
     * 分页查询
     */
  async getPageList() {
    const { ctx } = this;
    // const app_id = ctx.params.app_id;
    const { limit, offset, app_name, maturity_type } = ctx.query;
    const where = {
      is_delete: 0,
    };
    app_name && (where.app_name = app_name);
    maturity_type && (where.maturity_type = maturity_type);
    const params = {
      limit, offset, where,
    };

    console.log(params);
    const list = await ctx.service.applicant.getPageList(params);
    this.success(list);
  }
};
