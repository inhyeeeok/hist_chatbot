console.log('test');


// MySQL 접속 및 쿼리 실행 / 연결 close
var db_config = require(__dirname + '/database.js');
var conn = db_config.init();

const sql = "select * from test_table";

db_config.query(conn, sql, function (err, res) {
    console.log(err, res);
});



