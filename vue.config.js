var path = require('path')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/Recipe_For_Baby/'
    : '/',
    configureWebpack: {
        resolve: {
            alias: {
                src: path.resolve(__dirname, 'src')
            }
        }
    }
}