// 날짜 라이브러리
const moment = require('moment');
const today = moment();


// 1. Salad Reservation 
// 날짜, 사번 등 inputTestJson으로 샐러드 신청 내역 테이블에 insert
// 정상적으로 insert 후 해당 내역 보여주기 select 

//Onput Reservation Data Example
const inputTestJson = {
  "날짜": "{\"from\": {\"date\": \"2023-03-13\", \"dateTag\": null, \"dateHeadword\": null, \"year\": null, \"month\": null, \"day\": null}, \"to\": {\"date\": \"2023-03-19\", \"dateTag\": null, \"dateHeadword\": null, \"year\": null, \"month\": null, \"day\": null}, \"polynomial\": \"current_week\", \"calendar_type\": \"solar\", \"emp_no\": \"20210013\"}"
}

module.exports = {
  returnRequestJson: (block_id, param) => {
    console.log(JSON.stringify(param));

    var returnData;

    switch (block_id) {
      case '64053919665c902ebebe7dac':
        returnData = responseSelectDate(param['action']['params']['sys_date_params']);
        break;
      case '6413b8bec628e8623bc9be7a':
        // insert Data
        returnData = responseEndReserve(param['action']['clientExtra']['param']);
        break;
      default:
        returnData = responseEndReserve();
        break;
    }
    return returnData;

  }
}

const responseSelectDate = param => {
  //param = {"date": "2023-03-20", "dateTag": "Monday", "dateHeadword": null, "year": null, "month": null, "day": null, "polynomial": "define_weekday({0})", "calendar_type": "solar"}

  const selectDay = moment(JSON.parse(param)['date']).format('YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');
  const quickRepliesJson = [
    {
      "action": "block",
      "label": selectDay,
      "blockId": "6413b8bec628e8623bc9be7a",
    },
    {
      "action": "block",
      "label": today,
      "blockId": "6413b8bec628e8623bc9be7a",
    },
    {
      "action": "block",
      "label": "4월 03일",
      "blockId": "6413b8bec628e8623bc9be7a",
      "extra": { param }
    }
  ]

  return {
    "version": "2.0",
    "template": {
      "outputs": [
        {
          "simpleText": {
            "text": '샐러드 신청 가능한 날짜에요. (신청일 기준 2일 전부터 가능해요)'
          }
        }
      ],
      "quickReplies": quickRepliesJson
    }
  }
}

const responseEndReserve = param => {

  // 성공 시
  return {
    "version": "2.0",
    "template": {
      "outputs": [
        {
          "simpleText": {
            "text": param
          }
        },
        {
          "carousel": {
            "type": "itemCard",
            "items": [
              {
                "imageTitle": {
                  "title": "예약 완료",
                  "imageUrl": "https://t1.kakaocdn.net/openbuilder/docs_image/wine.jpg"
                },
                "itemList": [
                  {
                    "title": "매장명",
                    "description": "대한항공 인재개발원"
                  },
                  {
                    "title": "예약 일자",
                    "description": "2022.12.25, 19:30"
                  },
                  {
                    "title": "예약 일시",
                    "description": "2022.12.25, 19:30"
                  },
                  {
                    "title": "예약 내용",
                    "description": "샐러드 신청"
                  }
                ],
                "itemListAlignment": "left",
                "buttons": [
                  {
                    "label": "예약 내역",
                    "action": "message",
                    "messageText": "예약 내역"
                  },
                  {
                    "label": "예약 취소",
                    "action": "message",
                    "messageText": "예약 취소"
                  }
                ]
              }
            ]
          }
        }
      ],
      "quickReplies": [
        {
          "messageText": "처음으로",
          "action": "message",
          "label": "메뉴"
        },
        {
          "messageText": "도움말",
          "action": "message",
          "label": "도움말"
        },
        {
          "messageText": "기타",
          "action": "message",
          "label": "기타"
        }
      ]
    }
  }

  // 실패 시  
  // return {
  //   "version": "2.0",
  //   "template": {
  //     "outputs": [
  //       {
  //         "simpleText": {
  //           "text": param
  //         }
  //       },
  //     ],
  //     "quickReplies": [
  //       {
  //         "messageText": "처음으로",
  //         "action": "message",
  //         "label": "메뉴"
  //       },
  //       {
  //         "messageText": "도움말",
  //         "action": "message",
  //         "label": "도움말"
  //       },
  //       {
  //         "messageText": "기타",
  //         "action": "message",
  //         "label": "기타"
  //       }
  //     ]
  //   }
  // }
  

};


// Reservation Function
const reservation = inputTestJson => {

  var input = JSON.parse(inputTestJson.날짜);
  var emp_no = '';
  var from_date = '';
  var to_date = '';

  if (input.emp_no !== null) {
    emp_no = input.emp_no;
    console.log(emp_no);
  }

  if (input.from.date !== null) {
    from_date = input.from.date;
    console.log(from_date);
  }

  if (input.to.date !== null) {
    to_date = input.to.date;
    console.log(to_date);
  }

  // context.callbackWaitsForEmptyEventLoop = false;
  // const corsHeader = {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers":
  //     "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
  // };

  let sql = "select * from test_table";

  // if (vent.resource === '/hist/inquire') {
  //   sql = "select id from test_table";
  // } else if (event.resource === '/hist/sign') {
  //   sql = "select column1 from test_table";
  // } else if (event.resource === '/hist/cancel') {
  //   sql = "select column2 from test_table";
  // }

  if (emp_no !== '' && from_date !== '' && to_date !== '') {
    sql = "select * from test_table where emp_no = " + emp_no + " and red_date >= " + from_date + " and reg_date <= " + to_date;
  }


  console.log(sql);

  // con.query(sql, (err, res) => {
  //   if (err) {
  //     throw err
  //   }
  //   callback(null, {
  //     'header': corsHeader,
  //     'statusCode': 200,
  //     'body': res
  //   })
  // })

  // return responseTestJson
};

reservation(inputTestJson);