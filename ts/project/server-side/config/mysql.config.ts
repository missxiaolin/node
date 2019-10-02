const devConfig = {
    host: 'localhost',
    database: 'ts',
    user: 'root',
    password: '123456789',
}

const prodConfig = {
    host: 'xxx.xxx.xxx.xxx',
    database: 'ts',
    port: 3306,
}

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
