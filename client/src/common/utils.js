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

function extractSubstring(str, start, end) {
    var startindex = str.indexOf(start)
    var endindex = str.indexOf(end, startindex)
    if (startindex !== -1 && endindex !== -1 && endindex > startindex)
      return str.substring(startindex, endindex)
  }
  
