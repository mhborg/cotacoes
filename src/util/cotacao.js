const request = require("request");

const api_token = "612218d257df0386c545a0aecc198106";

const cotacao = (symbol, callback) => {
  const url = `http://api.marketstack.com/v1/eod?access_key=${api_token}&symbols=${symbol}`;

  console.log(url);

  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback(
        { mensage: `Something went wrong: ${err}`, code: 400 },
        undefined
      );
    }

    if (response.body === undefined || response.body.data === undefined) {
      callback({ mensage: `No data found`, code: 404 }, undefined);
    }

    const parsedJSON = response.body.data[0];

    const { symbol, open, close, high, low } = parsedJSON;

    return callback(undefined, { symbol, open, close, high, low });
  });
};

module.exports = cotacao;
