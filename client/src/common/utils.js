export function tryExtractVMErrorMessage(fullErrorMessage) {
  let parsingError = false
  let jsonParsedErrorMessage
  let message = fullErrorMessage

  try {
    const messageParsed = extractSubstring(message, '{', "'")
    jsonParsedErrorMessage = JSON.parse(messageParsed)
  } catch (error) {
    console.log('Error parsing message')
    parsingError = true
  }

  if (!parsingError) {
    message = jsonParsedErrorMessage.value.data.message
  }

  return message
}


export function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return month + '/' + day + '/' + year;
}

function extractSubstring(str, start, end) {
    var startindex = str.indexOf(start)
    var endindex = str.indexOf(end, startindex)
    if (startindex !== -1 && endindex !== -1 && endindex > startindex)
      return str.substring(startindex, endindex)
  }
  
