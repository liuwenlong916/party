/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617933229093_7099';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    // 关闭csrf
    security: {
      csrf: {
        enable: false,
      },
    },
    mysql: {
      client: {
        host: '10.1.131.31',
        port: '3306',
        user: 'root',
        password: 'new@1234.',
        database: 'db_widm',
      },
    },

    jwt: {
      secret: 'qwer@1234',
    },
  };
};

// exports.mysql = {
//   client: {
//     host: "10.1.102.145",
//     port: "3306",
//     user: "root",
//     password: "mysql.145.com",
//     database: "db_widm",
//   },
// };
