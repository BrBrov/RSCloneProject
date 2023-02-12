let { log } = console;

function toArrBuffer(str) {
  let buf = new ArrayBuffer(str.length * 2);
  let buf8Arr = new Uint8Array(buf);
  for (let index = 0; index < str.length; index++) {
    buf8Arr[index] = str.charCodeAt(index);
  }
  return buf;
}

async function importKey(key) {
    const imKey = await window.crypto.subtle.importKey(
      'jwk',
      key,
      'AES-CBC',
      true,
      ["encrypt", "decrypt"]);
    return imKey;
}

async function getHash(str) {
  const arrBuff = toArrBuffer(str);
  let hash = await crypto.subtle.digest('SHA-256', arrBuff);
  return hash ? hash : null;
}

async function encrypt(data, key, subKey) {
  const hashChif = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: subKey,
    },
    key,
    data
  );

  return hashChif ? hashChif : null;
}

async function decript(data, key, subKey) {
  let decData = await window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: subKey,
    },
    key,
    data
  );

  return decData ? decData : null;
}

const btnSignUP = document.querySelector('.sign-up');

btnSignUP.addEventListener('click', async () => {
  const inLogin = document.querySelector('.login-up');
  const inPass = document.querySelector('.pass-up');

  const login = inLogin.value;
  const pass = inPass.value;
  const hash = await getHash(pass)
  const idHash = await getHash(login);

  log(new Uint8Array(hash).toString());

  let req = await fetch('/login', { method: 'GET' });
  let resp = await req.json();

  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  const key = await importKey(resp);

  const hashChif = await encrypt(hash, key, iv);

  let body = JSON.stringify({
      pass: new Uint8Array(hashChif).toString(),
      id: new Uint8Array(idHash).toString(),
      login: login
    })

  req = await fetch('/login?mode=register', {
    method: 'POST',
    headers: {
      'Authorization': `Register ${iv}`,
      'Content-Type': 'application/json'
    },
    body: body
  })

  resp = await req.json();

  const outEl = document.querySelector('.output');

  switch (resp.register) {
    case 'none':
      outEl.textContent = 'User already has been registered!';
      break;
    case 'Internal db error!':
      outEl.textContent = 'Error with batabase!';
      break;
    case 'Cannot create apiKey!':
      outEl.textContent = 'Cannot create apiKey!';
      break;
    default:
      let token = new Uint8Array(resp.register.split(','));
      
      token = await decript(token, key, iv);

      outEl.textContent = new Uint8Array(token).join('');
      localStorage.setItem('token', new Uint8Array(token).join(''));
      localStorage.setItem('user', `${resp.user}`);
      break;
  }
})

const btnSignIn = document.querySelector('.sign-in');

btnSignIn.addEventListener('click', async () => {
  const inLogin = document.querySelector('.login-in');
  const inPass = document.querySelector('.pass-in');

  const login = inLogin.value;
  const pass = inPass.value;
  const hash = await getHash(pass);
  const idHash = await getHash(login);

  log('passHash: ', hash);
  log('loginHash: ', idHash)

  let req = await fetch('/auth', { method: 'GET' });
  let resp = await req.json();

  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  log('iv: ', iv);

  const key = await importKey(resp);

  const hashChif = await encrypt(hash, key, iv);
  const idHashChif = await encrypt(idHash, key, iv);

  req = await fetch('/auth?mode=enter', {
    method: 'POST',
    headers: {
      'Authorization': `Login ${iv}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: new Uint8Array(hashChif).toString(),
      id: new Uint8Array(idHashChif).toString()
    })
  })

  resp = await req.json();

  const outEl = document.querySelector('.output');
  tokenChiff = resp.token.split(',');

  switch (resp.token) {
    case 'Wrong request!':
      outEl.textContent = 'Wrong request!';
      break;
    case 'Unregistered!':
      outEl.textContent = 'Unregistered!';
      break;
    case 'Wrong passord!':
      outEl.textContent = 'Wrong passord!';
      break;
    default:
      let token = new Uint8Array(tokenChiff);
      token = await decript(token, key, iv);

      token = new Uint8Array(token).join('');

      console.log(token);
      outEl.textContent = token;
      localStorage.setItem('token', `${token}`);
      localStorage.setItem('user', resp.login);
      break;
  }
})