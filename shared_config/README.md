# About this folder
Share config is shared between client and server, read only.

On server side:
```javascript
const shared_config = require(process.env.SHARED_CONFIG_PATH);
```

On client side:
```javascript
const shared_config = require('shared_config'); 
```
