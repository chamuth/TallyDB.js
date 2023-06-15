# TallyDB.js
Connect to TallyDB servers in Node.js using TallyDB.js client driver.

## Get started
1. Install TallyDB.js using
```bash
npm install tallydb.js
```
2. Connect to TallyDB server
```javascript
const tallydb = require("../dist/index.js");

const connection = tallydb.connect({
  host: "127.0.0.1",
  port: 4053,
  username: "username",
  password: "password"
});
```
3. Query the TallyDB server
```javascript
const query = {
  function: "QUERY",
  slice: {
    name: "slice1",
  },
  range: {
    from: new Date().setMonth(0),
    to: new Date(),
  },
}

connection.query(
  query,
  (response) => {
    console.log("Response", response);
  },
  (err) => {
    console.error(err);
  },
);
```
