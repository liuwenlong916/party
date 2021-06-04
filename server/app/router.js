'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });
  router.get('/', controller.home.index);
  router.get('/captcha', controller.util.captcha);
  router.group({ name: 'user', prefix: '/user' }, router => {
    const { info, login } = controller.user;
    router.post('/login', login);
    router.get('/info', jwt, info);
    router.get('/:user_id', jwt, info);
  });
  router.group({ name: 'applicant', prefix: '/applicant' }, router => {
    const { getPageList } = controller.applicant;
    router.get('/getPageList', getPageList);
  });
};
