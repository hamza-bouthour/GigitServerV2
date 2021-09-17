const env = process.env;


// local mysql db connection
const remoteDB = 'mysql://b4bca88606d8fb:452f3c94@us-cdbr-east-04.cleardb.com/heroku_3240e6af6cc9cb8?reconnect=true';
const config = {
    db: {
        host: 'us-cdbr-east-04.cleardb.com',
        user: 'b4bca88606d8fb',
        password: '452f3c94',
        database: 'heroku_3240e6af6cc9cb8',
        waitForConnections: true
    }
}


module.exports = config;
