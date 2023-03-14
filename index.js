const mysql = require('mysql2');

const con = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE
});

exports.handler = (event, context, callback) => {
  // allows for using callbacks as finish/error-handlers

  console.log("쿼리파라미터:" + event.pathParameters);
  console.log("헤더:" + JSON.stringify(event.headers));
  console.log("바디:" + event.body);
  console.log("바디상세:" + event.body.action.params);
  console.log("이벤트:" + JSON.stringify(event.resource));

  context.callbackWaitsForEmptyEventLoop = false;
  const corsHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
  };

  let sql = "select * from test_table";

  if (event.resource === '/hist/inquire') {
    sql = "select id from test_table";
  } else if (event.resource === '/hist/sign') {
    sql = "select column1 from test_table";
  } else if (event.resource === '/hist/cancel') {
    sql = "select column2 from test_table";
  }

  con.query(sql, (err, res) => {
    if (err) {
      throw err
    }
    callback(null, {


      'header': corsHeader,
      'statusCode': 200,
      'body': JSON.stringify({
        "version": "2.0",
        "template": {
          "outputs": [
            {
              "simpleText": {
                "text": "토트넘 선수 리스트입니다."
              }
            }
          ],
          "quickReplies": [
            {
              "messageText": "손흥민",
              "action": "message",
              "label": "손흥민"
            },
            {
              "messageText": "헤리케인",
              "action": "message",
              "label": "헤리케인"
            },
            {
              "messageText": "에릭센",
              "action": "message",
              "label": "에릭센"
            },
            {
              "messageText": "요리스",
              "action": "message",
              "label": "요리스"
            }
          ]
        }
      })
    })
  })
};




