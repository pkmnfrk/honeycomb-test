const handler = require("./handler");

handler.entry({}, {}).then((response) => {
    console.log("done", response);
}).catch((e) => {
    console.error("Error", e);
});