const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/index", {
      target: "https://www.bilibili.com",
      changeOrigin: true,
    })
  );
};
