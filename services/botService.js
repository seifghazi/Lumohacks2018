var AssistantV1                     = require('watson-developer-cloud/assistant/v1');
var NaturalLanguageUnderstandingV1  = require('watson-developer-cloud/natural-language-understanding/v1');
var regression                      = require('regression');
require('dotenv').config();

// IBM Watson Conversation Assistant API, used to generate text output in response to user input
var watsonAssistant = new AssistantV1({
  version: '2018-07-10',
  username: process.env.WATSON_BOT_USERNAME,
  password: process.env.WATSON_BOT_PASSWORD,
  url: process.env.WATSON_BOT_URL
});

// IBM Watson NLU API, used to calculate sentiment from Assistant output
var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-03-19',
  username: process.env.WATSON_SENTIMENT_USERNAME,
  password: process.env.WATSON_SENTIMENT_PASSWORD,
  url: process.env.WATSON_SENTIMENT_URL
});

// Function to send the message to Watson API and returns the response
const sendMessage = async function(input) {
  [res, err] = await watsonAssistant.message({
    workspace_id: '2eca6c93-2b1e-45a0-b17e-2c759ee816a2',
    input: {'text': input.text}
  })

  if (err) {
    console.log('error:', err);
  } else {
    return res.output.text;
  }
};
module.exports.sendMessage = sendMessage;

// Function to process return message from Watson API,
// calculates sentiment using NLU API, and calculates gradient of best fit
// line through accumulated points so far
const getSentiment = async function(input) {
  var parameters = {
    'text': input,
    'features': {
      'sentiment': {}
    }
  };

  [res, err] = await naturalLanguageUnderstanding.analyze(parameters);

  if (err) {
    console.log('error:', err);
  } else {
    points.push([message_num, Number(res.sentiment.document.score)])
    message_num++;
    gradient = regression.linear(points).equation[0];

    var output = {
      textOutput: input,
      points: points,
      bestFitGradient: gradient,

    }

    return output;
  }
}
module.exports.getSentiment = sendMessage;
