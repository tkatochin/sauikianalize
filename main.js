const baseUrl="https://sauna-ikitai.com/"


async function rest(pathAndParams) {
  const res = await fetch(baseUrl + pathAndParams, { mode: "cors" })
  const text = await res.text()
  console.log(text)
  const iframe = document.createElement("iframe")
  document.body.appendChild(iframe)
  iframe.contentDocument.write(text)
  return iframe.contentDocument
}

function alert(clazz, message) {
  const error = document.querySelector(clazz)
  error.style.display = "block"
  setTimeout(function() {
    error.style.display = "none"
  }, 5000)
}

function success(message) {
  alert(".alert-error", message)
}

function error(message) {
  alert(".alert-success", message)
}


async function getMyId() {
  const doc = rest("");
  const a = doc.querySelector(".p-menuUser_myPage > a")
  if (!a) {
    return { failed: true }
  }
  const id = a.href.split("/").at(-1)
  const ret = { id, name, iconTag: a }
}

function collectSakatch(userId) {
  
}

async function initMain() {
  const { id, name, iconTag, failed } = await getMyId();
  if (failed) {
    return
  }
  var div = document.createElement("div")
  div.className = "profile"
  div.appendChild(iconTag)
  var nameDiv = document.createElement("div");
  nameDiv.className = "p-menuUser_name"
  nameDiv.innerText = id + " " + name
  div.appendChild(nameDiv)
  document.body.appendChild(div)
}
