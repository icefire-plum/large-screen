const px2rem = require('postcss-px2rem')

// 使用等比适配插件
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
        postcss: {
            plugins: [
                px2rem({
                    remUnit: 100,
                    "plugins": {
                        "autoprefixer": {},
                        "postcss-px2rem-exclude":{
                            "remUnit": 75,
                            "exclude":"/node_modules/i"
                        }
                    }
                })
            ]
        }
    }
  }
}