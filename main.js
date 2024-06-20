const baseUrl="https://sauna-ikitai.com/"
const worker = new Worker("worker.js")
const resultWorker = {}
const lastUID = Math.floor(Math.random() * 10000) * 10000;

worker.onmessage = (e) => {
  const [ reqId, text ] = e.data;
  const iframe = document.createElement("iframe")
  document.body.appendChild(iframe)
  iframe.contentDocument.write(text)
  resultWorker[reqId] = iframe
};

async function rest(pathAndParams) {
  const reqId = lastUID++
  worker.postMessage([ reqId, pathAndParams ])

  const iframe = await new Promise((resolve, reject) => {
    const iid = setInterval(function () {
      const iframe = resultWorker[reqId]
      if (iframe) {
        clearInterval(iid)
        delete resultWorker[reqId]
        resolve(iframe)
      }
    }, 100)
  })
  const doc = iframe.contentDocument
  document.body.removeChild(iframe)
  return doc
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
  const doc = await rest("");
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
  var nameDiv = document.createElement("div")
  nameDiv.className = "p-menuUser_name"
  nameDiv.innerText = id + " " + name
  div.appendChild(nameDiv)
  document.body.appendChild(div)
}
