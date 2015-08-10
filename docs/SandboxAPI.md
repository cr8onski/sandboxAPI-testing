# Sandbox API

------
## GET Operations

### 3drdownload
**GET {serverRoot}/vwfdatamanager.svc/3drdownload**

Returns:
```javascript
```

### 3drmetadata
**GET {serverRoot}/vwfdatamanager.svc/3drmetadata**

Returns:
```javascript
```

### 3drpermission
**GET {serverRoot}/vwfdatamanager.svc/3drpermission**

Returns:
```javascript
```

### 3drsearch
**GET {serverRoot}/vwfdatamanager.svc/3drsearch**

Returns:
```javascript
```

### 3drtexture
**GET {serverRoot}/vwfdatamanager.svc/3drtexture**

Returns:
```javascript
```

### 3drthumbnail
**GET {serverRoot}/vwfdatamanager.svc/3drthumbnail**

Returns:
```javascript
```

### apppath
**GET {serverRoot}/vwfdatamanager.svc/apppath**

Accepts:
*(None)*

Returns:
```javascript
The path to the application. (default: /adl/sandbox)
```

### cameras
**GET {serverRoot}/vwfdatamanager.svc/cameras**

Accepts:

`SID` (`String`)
Sandbox world identifier.

Returns:
```javascript
Array of camera objects added to Sandbox world.
```

### copyinstance
**GET {serverRoot}/vwfdatamanager.svc/copyinstance**

Returns:
```javascript
```

### datafile
**GET {serverRoot}/vwfdatamanager.svc/datafile**

Returns:
```javascript
```

### docdir
**GET {serverRoot}/vwfdatamanager.svc/docdir**

Accepts:

*(None)*

Returns:
```javascript
The directory structure of the documention in the VW Sandbox repository on github.
```

### forgotpassword
**GET {serverRoot}/vwfdatamanager.svc/forgotpassword**

Returns:
```javascript
```

### getanalytics.js
**GET {serverRoot}/vwfdatamanager.svc/getanalytics.js**

Returns:
```javascript
```

### getassets
**GET {serverRoot}/vwfdatamanager.svc/getassets**

Accepts:

`SID` (`String`)
Sandbox world identifier.

Returns:
```javascript
Array of asset objects.
```

### globalassetassetdata
**GET {serverRoot}/vwfdatamanager.svc/globalassetassetdata**

Accepts:

`AID` (`String`)
Asset identifier.

Returns:
```javascript
Array of not quite sure.
```

### globalassetmetadata
**GET {serverRoot}/vwfdatamanager.svc/globalassetmetadata**

Accepts:

`AID` (`String`)
Asset identifier.

Returns:
```javascript
Array of not quite sure.
```

### globalassets
**GET {serverRoot}/vwfdatamanager.svc/globalassets**

`AID` (`String`)
Not really.

Returns:
```javascript
Should be an array of asset objects.
```

### inventory
**GET {serverRoot}/vwfdatamanager.svc/inventory**

Returns:
```javascript
```

### inventoryitemassetdata
**GET {serverRoot}/vwfdatamanager.svc/inventoryitemassetdata**

Returns:
```javascript
```

### inventoryitemmetadata
**GET {serverRoot}/vwfdatamanager.svc/inventoryitemmetadata**

Returns:
```javascript
```

### login
**GET {serverRoot}/vwfdatamanager.svc/login**

Returns:
```javascript
```

### logindata
**GET {serverRoot}/vwfdatamanager.svc/logindata**

Returns:
```javascript
```

### logout
**GET {serverRoot}/vwfdatamanager.svc/logout**

Returns:
```javascript
```

### profile
**GET {serverRoot}/vwfdatamanager.svc/profile**

Accepts:

`UID` (`String`)
User identification string

Returns:
```javascript
User profile object.
May include fields:
Username
Email
Avatar
Salt
inventoryKey
id
```

### profiles
**GET {serverRoot}/vwfdatamanager.svc/profiles**

Accepts:

*(None)*

Returns:
```javascript
Array of all current users' UIDs.
```

### restorebackup
**GET {serverRoot}/vwfdatamanager.svc/restorebackup**

Returns:
```javascript
```

### salt
**GET {serverRoot}/vwfdatamanager.svc/salt**

Accepts:

`UID` (`String`)
User identification

Returns:
```javascript
Salt for a given UID.
```

### saspath
**GET {serverRoot}/vwfdatamanager.svc/saspath**

Accepts:

(*None*)

Returns:
```javascript
The path to the _______. (default: /sas)
```

### sitelogin
**GET {serverRoot}/vwfdatamanager.svc/sitelogin**

Accepts:

UID (`String`)
User identification.

Returns:
```javascript
Login Format incorrect
```

### sitelogout
**GET {serverRoot}/vwfdatamanager.svc/sitelogout**

Accepts:

Not sure.

Returns:

```javascript
(*Nothing*)
```

### state
**GET {serverRoot}/vwfdatamanager.svc/state**

Accepts:

SID (`String`)
State identification.

Returns:
```javascript
State object.
```

### statedata
**GET {serverRoot}/vwfdatamanager.svc/statedata**

SID (`String`)
State identifier.

Returns:
```javascript
Brief information of state object.
```

### statehistory
**GET {serverRoot}/vwfdatamanager.svc/statehistory**

SID (`String`)
State identifier.

Returns:
```javascript
History object containing two arrays: children and parents.
```

### states
**GET {serverRoot}/vwfdatamanager.svc/states**

Accepts:

*(None)*

Returns:
```javascript
State data of every available world on server.
```

### stateslist
**GET {serverRoot}/vwfdatamanager.svc/stateslist**

SID (`String`)
State identifier.

Returns:
```javascript
Array of backups/saves.
```

### texture
**GET {serverRoot}/vwfdatamanager.svc/texture**

Accepts:

`UID` (`String`)
Path and texture filename.

Returns:
```javascript
Image.
```

### textures
**GET {serverRoot}/vwfdatamanager.svc/textures**

Accepts:

*(None)*

Returns:
```javascript
All available textures.
```

### texturethumbnail
**GET {serverRoot}/vwfdatamanager.svc/texturethumbnail**

Accepts:

`UID` (`String`)
Path and texture filename.

Returns:
```javascript
Image.
````

### thumbnail
**GET {serverRoot}/vwfdatamanager.svc/thumbnail**

Accepts:

`SID` (`String`)
State identifier.

Returns:
```javascript
Thumbnail image of world.
```

### updatepassword
**GET {serverRoot}/vwfdatamanager.svc/updatepassword**

Returns:
```javascript
```


----------

## POST Operations

### 3drupload
**POST {serverRoot}/vwfdatamanager.svc/3drupload**

Returns:
```javascript
```

### createprofile
**POST {serverRoot}/vwfdatamanager.svc/createprofile**

Returns:
```javascript
```

### createstate
**POST {serverRoot}/vwfdatamanager.svc/createstate**

Returns:
```javascript
```

### error
**POST {serverRoot}/vwfdatamanager.svc/error**

Returns:
```javascript
```

### globalasset
**POST {serverRoot}/vwfdatamanager.svc/globalasset**

Returns:
```javascript
```

### inventoryitem
**POST {serverRoot}/vwfdatamanager.svc/inventoryitem**

Returns:
```javascript
```

### inventoryitemmetadata
**POST {serverRoot}/vwfdatamanager.svc/inventoryitemmetadata**

Returns:
```javascript
```

### profile
**POST {serverRoot}/vwfdatamanager.svc/profile**

Returns:
```javascript
```

### publish
**POST {serverRoot}/vwfdatamanager.svc/publish**

Returns:
```javascript
```

### statedata
**POST {serverRoot}/vwfdatamanager.svc/statedata**

Returns:
```javascript
```

### thumbnail
**POST {serverRoot}/vwfdatamanager.svc/thumbnail**

Returns:
```javascript
```

------
## DELETE Operations

### globalasset
**DELETE {serverRoot}/vwfdatamanager.svc/globalasset**

Returns:
```javascript
```

### inventoryitem
**DELETE {serverRoot}/vwfdatamanager.svc/inventoryitem**

Returns:
```javascript
```

### profile
**DELETE {serverRoot}/vwfdatamanager.svc/profile**

Returns:
```javascript
```

### state
**DELETE {serverRoot}/vwfdatamanager.svc/state**

Accepts:

`URL`



Returns:
```javascript
```
