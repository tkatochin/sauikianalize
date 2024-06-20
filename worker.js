onmessage = async function (e) {
  const [ uid, pathAndParams ] = e.data
  const text = await rest(pathAndParams)
  postMessage([ uid, text ]);
}

async function rest(pathAndParams) {
  console.log("Message received from main script - " + baseUrl + pathAndParams);
  const res = await fetch(baseUrl + pathAndParams, { mode: "cors" })
  const text = await res.text()
  console.log(text)
  return text
}
