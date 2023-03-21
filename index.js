const sampleJson = require(__dirname + '/sampleJson.js');
const saladFunction = require(__dirname + '/salad.js');


exports.handler = (event, context, callback) => {
  //node 10버전 이후로는 context로 인하여 함수가 중지되지 않아 502 에러가 뜬다.
  //그렇기에 아래 구문을 실행하고, callback으로 함수를 중단한다.
  context.callbackWaitsForEmptyEventLoop = false;

  //api gateway에서 CORS 활성화 버튼을 누르면 cors가 열리나
  //모든 브라우저에 대해 cors를 열면 해달 기능이 작동하지 않는다.
  //그러므로 백엔드 코드 header에 cors를 열어주어야 한다.
  const corsHeader = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  };

  var returnData = {};
  console.log('들어온값' + JSON.stringify(JSON.parse(event['body'])['action']['params']));
  console.log('블록ID ' + JSON.stringify(JSON.parse(event['body'])['userRequest']['block']['id']));
  console.log('유저ID ' + JSON.stringify(JSON.parse(event['body'])['userRequest']['user']['id']));
  console.log('이벤트값' + JSON.stringify(event));


  const block_id = JSON.parse(event['body'])['userRequest']['block']['id'];
  const user_id = JSON.parse(event['body'])['userRequest']['user']['id'];

  switch (event.resource) {
    case '/hist/inquire':
      returnData = event;
      break;
    case '/hist/sign':
      returnData = sampleJson.responseSampleJson();
      break;
    case '/hist/salad': //샐러드 스킬서버
      returnData = saladFunction.returnRequestJson(block_id, JSON.parse(event['body']));
      break;
    default:
      returnData = event;
      break;
  }

  callback(null, {
    'header': corsHeader,
    'statusCode': 200,
    'body': JSON.stringify(returnData)
  })
};




