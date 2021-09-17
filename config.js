const env = process.env;


// local mysql db connection

const config = {
    db: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'gigit',
        waitForConnections: true
    }
}


module.exports = config;
