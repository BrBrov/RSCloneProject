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
## 1

### Get one track

#### Requst GET on /play with query ?id=<number of track>
#### Response JSON as 
```
  {
	"id": 2,
	"artist": "Oliver Tree & Robin Schulz",
  "title": "Miss You",
  "genre": "pop",
  "file": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/78/d1/8f/78d18f9f-671b-3c3c-0033-917651170937/mzaf_14625856779470870222.plus.aac.ep.m4a",
  "logo": "https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/69/e0/27/69e02785-714c-d0b9-ba68-04a2361fa7e5/075679730466.jpg/400x400cc.jpg"
	}
```
### Get tracks with limit and page

#### Request GET on /tracks?limit=<number limit>&page=<number page>
#### Response JSON
```
{traks: [
	{
		"id": 2,
	  "artist": "Oliver Tree & Robin Schulz",
    "title": "Miss You",
    "genre": "pop",
    "file": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/78/d1/8f/78d18f9f-671b-3c3c-0033-917651170937/mzaf_14625856779470870222.plus.aac.ep.m4a",
    "logo": "https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/69/e0/27/69e02785-714c-d0b9-ba68-04a2361fa7e5/075679730466.jpg/400x400cc.jpg"
	},
	{...},
	...
	{...}
]}
```

### Get random tracks
#### Reguest GET on /random?limit=<number limit>
#### Response JSON

### Search
#### Reguest GET on /search?string = <query search>
#### Response JSON

### Get playlist
#### Request GET on /playlist?user=<login in hash>&token=<token>
#### Response JSON 
```
{traks: [
	{
		"id": 2,
	  "artist": "Oliver Tree & Robin Schulz",
    "title": "Miss You",
    "genre": "pop",
    "file": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/78/d1/8f/78d18f9f-671b-3c3c-0033-917651170937/mzaf_14625856779470870222.plus.aac.ep.m4a",
    "logo": "https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/69/e0/27/69e02785-714c-d0b9-ba68-04a2361fa7e5/075679730466.jpg/400x400cc.jpg"
	},
	{...},
	...
	{...}
]}
```
# Operations with playlist

### Add song into playlist
#### Request POST on /playlist?user=<login in hash>&token=<token>
#### BODY {id: <id track>}
#### Response JSON all playlist

### Delete song from playlist
#### Requst DELETE /playlist?id=<id song>$user=<login in hash>&token=<token>
#### Response JSON all playlist
