module.exports = {
    requestSampleJson: () => {
        return requestSampleJson;
    },

    responseSampleJson: (param) => {
        var returnJson;

        switch (param) {
            case '0':
                returnJson = responseSampleJson;
                break;
            case '1':
                returnJson = responseSample2Json;
                break;
            default:
                returnJson = responseSampleJson;
                break;
        }
        return returnJson;
    }
}

const requestSampleJson = {
    "userRequest": {
        "timezone": "Asia/Seoul",
        "params": {},
        "block": {
            "id": "<블록 id>",
            "name": "<블록 이름>"
        },
        "utterance": "<사용자 발화>",
        "lang": "kr",
        "user": {
            "id": "<사용자 botUserKey>",
            "type": "botUserKey",
            "properties": {
                "plusfriendUserKey": "<카카오톡 채널 사용자 id>"
            }
        }
    },
    "contexts": [],
    "bot": {
        "id": "<봇 id>",
        "name": "<봇 이름>"
    },
    "action": {
        "name": "<스킬 이름>",
        "clientExtra": null,
        "params": {},
        "id": "<스킬 id>",
        "detailParams": {}
    }
}


const responseSampleJson = {
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
};

const responseSample2Json = {
    "version": "2.0",
    "template": {
        "outputs": [
            {
                "simpleText": {
                    "text": "신청 가능한 예약 날짜 선택해 주세요."
                }
            },
        ],
        "quickReplies": [
            {
                "messageText": "3월20일 (월요일)",
                "action": "message",
                "label": "3월20일 (월요일)"
            },
            {
                "messageText": "3월21일 (화요일)",
                "action": "message",
                "label": "화요일"
            },
            {
                "messageText": "3월22일 (수요일)",
                "action": "message",
                "label": "수요일"
            }
        ]
    }
};