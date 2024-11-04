 const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(createProxyMiddleware(
        
        "/api",
        {
            target: "http://116.62.207.126/",
            changeOrigin: true,
            pathRewrite: {

                "^/api":""
            }
        }
    ))
}

 

 

/* npm  install  http-proxy-middleware@1.x  -S */