const tallydb = require("../dist/index.js");

const connection = tallydb.connect({
  host: "127.0.0.1",
  port: 4053,
  username: "username",
  password: "password",
});

const q1 = "TEST";
var i = 1;

setInterval(() => {
  connection.query(
    q1 + i.toString(),
    (res) => {
      console.log("Response: " + JSON.stringify(res));
      i++;
    },
    () => { },
  );
}, 2000)