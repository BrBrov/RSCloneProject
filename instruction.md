### Autorization

#### http://<your url>/login
## 1 
#### Request GET on '/login'
#### Response CryptoKey of AES-CBC

## 2
#### Need generate ivKey, after request POST with HEADER Autorization: Registration <ivKey>
#### and Query param ?mode=register, and body with password and login hashes encryted with AES-CBC
## 3
#### Response witn token of autorization or {register: 'none'} in JSON format 

### Registration

#### http://<your url>/login
## 1 
#### Request GET on '/auth'
#### Response CryptoKey of AES-CBC

## 2
#### Need generate ivKey, after request POST with HEADER Autorization: Registration <ivKey>
#### and Query param ?mode=enter, and body with password and login hashes encryted with AES-CBC
## 3
#### Response witn token of autorization or { token: 'Wrong passord!' } or  { token: 'Unregistered!'} in JSON format
