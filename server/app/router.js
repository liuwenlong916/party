"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/captcha", controller.util.captcha);
  router.group({ name: "user", prefix: "/user" }, (router) => {
    const { info } = controller.user;
    router.get("/:user_id", info);
  });
};
