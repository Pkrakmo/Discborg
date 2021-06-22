module.exports = function (x :string) {
    
    require('dotenv').config();

    const fetch = require("node-fetch");
    const whrul = process.env.WEBHOOK;
    const msg = {
        "content": `${x}`
    };
    fetch(whrul, {
        "method": "POST", "headers": { "content-type": "application/json" },
        "body": JSON.stringify(msg)
    });
};
