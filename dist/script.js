function toArrBuffer(str) {
  const arrBuffer = new ArrayBuffer(str.length);
  const int8Arr = new Uint8Array(arrBuffer);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    int8Arr[i] = str.charCodeAt(i);
  }
  return arrBuffer;
}

const context = new AudioContext();
let audioBuffer;
let audioSource;
let destination;
let volume;
let id;
let isPlay = false;

const songs = document.querySelector('.songs');

songs.addEventListener('click', async (ev) => {
  switch (ev.target.className) {
    case 'play':
      if (isPlay && ev.target.dataset.id === id) {
        audioSource.stop();
        audioSource.start(0)
      }
      if (audioSource) {
        audioSource.stop();
      }
      isPlay = true;
      id = ev.target.dataset.id;
      let fet = await fetch(`/play?id=${id}`, { method: 'GET' });
      if (fet.status !== 200) {
        const resp = await fet.json();
        return;
      }

      resp = await fet.json();

      const url = new URL(resp.file);

      fet = await fetch(url, { method: 'GET' });

      resp = await fet.arrayBuffer();

      console.log(resp);
      context.decodeAudioData(resp, (decodedArrayBuffer) => {
        audioBuffer = decodedArrayBuffer;
        audioSource = context.createBufferSource();
        audioSource.buffer = audioBuffer;
        destination = context.destination;
        volume = context.createGain();
        volume.gain.value = 0.5;
        audioSource.connect(volume);
        volume.connect(destination);
        audioSource.start(0);
      })

      break;
    case 'stop':
      if (ev.target.dataset.id === id) {
        isPlay = false;
        audioSource.stop();
      }      
      break;
  }
});

const btnSignUP = document.querySelector('.sign-up');

btnSignUP.addEventListener('click', async () => {
  const inLogin = document.querySelector('.login-up');
  const inPass = document.querySelector('.pass-up');

  const login = inLogin.value;
  const pass = inPass.value;
  const hash = await crypto.subtle.digest('SHA-256', toArrBuffer(pass));
  const idHash = await crypto.subtle.digest('SHA-256', toArrBuffer(login));

  let req = await fetch('/login', { method: 'GET' });
  let resp = await req.json();

  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  const key = await window.crypto.subtle.importKey(
    'jwk',
    resp,
    'AES-CBC',
    true,
    ["encrypt", "decrypt"]);

  const hashChif = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    key,
    hash
  );

  console.log(new Uint8Array(idHash).join(''));

  req = await fetch('/login?mode=register', {
    method: 'POST',
    headers: {
      'Authorization': `Register ${iv}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: new Uint8Array(hashChif).toString(),
      id: new Uint8Array(idHash).toString()
    })
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
      let token = await window.crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: iv,
        },
        key,
        new Uint8Array(resp.register.split(','))
      );
      outEl.textContent = new Uint8Array(token).join('');
      localStorage.setItem('token', `${token}`);
      break;
  }
  console.log(resp);
})

const btnSignIn = document.querySelector('.sign-in');

btnSignIn.addEventListener('click', async () => {
  const inLogin = document.querySelector('.login-in');
  const inPass = document.querySelector('.pass-in');

  const login = inLogin.value;
  const pass = inPass.value;
  const hash = await crypto.subtle.digest('SHA-256', toArrBuffer(pass));
  const idHash = await crypto.subtle.digest('SHA-256', toArrBuffer(login));

  let req = await fetch('/auth', { method: 'GET' });
  let resp = await req.json();

  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  const key = await window.crypto.subtle.importKey(
    'jwk',
    resp,
    'AES-CBC',
    true,
    ["encrypt", "decrypt"]);

  const hashChif = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    key,
    hash
  );

  req = await fetch('/auth?mode=enter', {
    method: 'POST',
    headers: {
      'Authorization': `Login ${iv}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: new Uint8Array(hashChif).toString(),
      id: new Uint8Array(idHash).toString()
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
      let token = await window.crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: iv
        },
        key,
        new Uint8Array(tokenChiff)
      );
      console.log(token);
      outEl.textContent = new Uint8Array(token).join('');
      localStorage.setItem('token', `${token}`);
      break;
  }
})