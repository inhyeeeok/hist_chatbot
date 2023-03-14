// 날짜 라이브러리
// const moment = require('moment');
// const today = moment();
// console.log(today.format('YYYYMMDD'));


// 1. Salad Reservation 
// 날짜, 사번 등 inputTestJson으로 샐러드 신청 내역 테이블에 insert
// 정상적으로 insert 후 해당 내역 보여주기 select 

//Onput Reservation Data Example
const inputTestJson = {
    "날짜": "{\"from\": {\"date\": \"2023-03-13\", \"dateTag\": null, \"dateHeadword\": null, \"year\": null, \"month\": null, \"day\": null}, \"to\": {\"date\": \"2023-03-19\", \"dateTag\": null, \"dateHeadword\": null, \"year\": null, \"month\": null, \"day\": null}, \"polynomial\": \"current_week\", \"calendar_type\": \"solar\"}"
}

//Output Reservation Data Example (https://i.kakao.com/docs/skill-response-format#skillpayload)
const responseTestJson = {
    "version": "2.0",
    "template": {
      "outputs": [
          {
              "simpleText": {
                  "text": "예약이 성공적으로 완료되었습니다. 신청하신 예약을 확인해 주세요."
              }
            },
        {
          "carousel": {
            "type": "itemCard",
            "items": [
              {
                "imageTitle": {
                  "title": "예약 완료",
                  "imageUrl" : "https://t1.kakaocdn.net/openbuilder/docs_image/wine.jpg"
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
                    "title" : "예약 내용",
                    "description" : "샐러드 신청"
                  }
                ],
                "itemListAlignment": "left",
                "buttons": [
                  {
                    "label": "예약 내역",
                    "action": "message",
                    "messageText" : "예약 내역"
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
  };

// Reservation Function
const reservation = inputTestJson => responseTestJson;
console.log(reservation);