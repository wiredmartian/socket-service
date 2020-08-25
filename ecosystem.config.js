module.exports = {
    apps : [{
        name: "Paygate Bouncer",
        script: "server.js",
        env: {
            NODE_ENV: "development",
            PORT: 9001,
            DB_DEBUG: false,
        },
        env_production: {
            NODE_ENV: "production",
            PORT: 9001,
        }
    }]
}