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
  const config = (exports = {
    sequelize: {
      dialect: 'mysql',
      database: 'egg-sequelize-doc-default',
      hot: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'lzg_!qaz@wsx',
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605521849848_8817';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
