const mysql = require('mysql2');

// const con = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT,
//   database: process.env.RDS_DATABASE
// });

const db_info = {
    host: 'db-apihiligh-temp.crjbxn43nqyk.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'q1w2e3r4',
    port: '3306',
    database: 'test_db1'
}

module.exports = {
    init: () => {
        return mysql.createConnection(db_info);
    },

    connect: (conn) => {
        conn.connect(function (err) {
            if (err) console.error('mysql connection error : ' + JSON.stringify(err));
            else console.log('mysql is connected successfully!');
        });
    },

    query: (conn, sql, callback) => {
        conn.query(sql, (err, res) => {
            if(err) console.log('query is not excuted. insert fail...\n' + JSON.stringify(err)), callback('fail', err), conn.end();
            else console.log('query is excuted. insert success...\n' + JSON.stringify(res)), callback('success', res), conn.end();
        });
    }
}




