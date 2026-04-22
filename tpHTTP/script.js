
const headersContainer = document.querySelector('.headers');
const addHeaderBtn     = headersContainer.querySelector('button');


const headerRows = [];

addHeaderBtn.addEventListener('click', () => {
  const rowEl = document.createElement('div');
  rowEl.className = 'header-row';

  const keyInput = document.createElement('input');
  keyInput.type        = 'text';
  keyInput.placeholder = 'Header key';

  const valInput = document.createElement('input');
  valInput.type        = 'text';
  valInput.placeholder = 'Header value';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✕';
  removeBtn.title       = 'Remove this header';

  removeBtn.addEventListener('click', () => {
    
    const index = headerRows.findIndex(r => r.rowEl === rowEl);
    if (index !== -1) headerRows.splice(index, 1);
    rowEl.remove();
    console.log('headerRows after remove:', headerRows);
  });

  rowEl.appendChild(keyInput);
  rowEl.appendChild(valInput);
  rowEl.appendChild(removeBtn);
  headersContainer.appendChild(rowEl);

  
  headerRows.push({ keyEl: keyInput, valEl: valInput, rowEl });
  console.log('headerRows after push:', headerRows);
});



const sendBtn       = document.querySelector('.row button');
const methodSelect  = document.querySelector('.row select');
const urlInput      = document.querySelector('.row input[type="text"]');
const bodyTextarea  = document.querySelectorAll('.textarea textarea')[0];
const responseArea  = document.querySelectorAll('.textarea textarea')[1];
const responseLabel = document.querySelectorAll('.textarea label')[1];

sendBtn.addEventListener('click', () => {
  const method = methodSelect.value;
  const url    = urlInput.value.trim();

  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  
  const headers = {};
  headerRows.forEach(({ keyEl, valEl }) => {
    const k = keyEl.value.trim();
    const v = valEl.value.trim();
    if (k) headers[k] = v;
  });

  
  const options = { method, headers };

  const bodyValue = bodyTextarea.value.trim();
  if (['POST', 'PUT', 'PATCH'].includes(method) && bodyValue) {
    options.body = bodyValue;
    if (!headers['Content-Type']) {
      try {
        JSON.parse(bodyValue);
        options.headers['Content-Type'] = 'application/json';
      } catch {
        options.headers['Content-Type'] = 'text/plain';
      }
    }
  }

  responseLabel.textContent = 'Response body — sending…';
  responseArea.value = '';

  fetch(url, options)
    .then(response => {
      const respHeaders = {};
      response.headers.forEach((value, name) => {
        respHeaders[name] = value;
      });
      return response.text().then(text => ({
        status:     response.status,
        statusText: response.statusText,
        headers:    respHeaders,
        body:       text,
      }));
    })
    .then(({ status, statusText, headers: respHeaders, body }) => {
      responseLabel.textContent = `Response body — ${status} ${statusText}`;

      const headerLines = Object.entries(respHeaders)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');

      let prettyBody = body;
      try { prettyBody = JSON.stringify(JSON.parse(body), null, 2); } catch {}

      responseArea.value =
        `=== STATUS ===\n${status} ${statusText}\n\n` +
        `=== HEADERS ===\n${headerLines}\n\n` +
        `=== BODY ===\n${prettyBody}`;
    })
    .catch(err => {
      responseLabel.textContent = 'Response body — Error';
      responseArea.value = `Request failed:\n${err.message}`;
    });
});