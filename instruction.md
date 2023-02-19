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

## Work with music

### Get one track

#### Requst GET on /play?id=<id of track>
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

### Get random tracks with genre sorting
#### Reguest GET on /style?genre=<name of genre>&page=<number page>&limit=<number limit>
#### Response JSON
#### Header cpunt: <all count genre songs in number>

### Search
#### Reguest GET on /search?string = <query search>
#### Response JSON


## Operations with playlist
### Get playlist
#### Request GET on /playlist?user=<login in hash>&token=<token>

#### Response JSON 
```
{ id: <hash login>,
	traks: [
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
  ],
  songsID: [2,4,5....102,284]
}
```


### Add song into playlist
#### Request POST on /playlist?user=<login>&token=<token>
#### BODY {id: <id track>}
#### Response JSON all playlist

### Delete song from playlist
#### Requst PUT /playlist?user=<login>&token=<token>
#### Body : id of track
#### Response JSON all playlist

### Delete playlist 
#### Request DELETE /playlist?user=<login>&token=<token>
#### Response JSON result

## Operation with songs rate

#### Set Up song rate POST /rate
#### BODY id:<id song>
#### Header: Content-Type: application/json
#### Return true or false

#### Get list of songs with rate GET /rate?limit=<number of limit>
#### Return JSON result