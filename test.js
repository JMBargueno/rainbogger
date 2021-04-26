const { Rainbogger, customParseDate, getDateOfLog } = require("./index");
const assert = require("assert");

const dateString = "2021-04-26T20:31:15.923Z";
const parsedDate = "2021-04-26T20h31m15.923Zs";
const fileLogName = "debug#2021-04-26T20h33m59.375Zs.log";
const dateOfFileLog = "2021-04-26T20:33:59.375Z";

describe("Functions", () => {
  it("[customParseDate] The dateString must be equal parsedDate", () => {
    assert.equal(customParseDate(dateString), parsedDate);
  });
  it("[getDateOfLog] The date returned must be the same", () => {
    assert.equal(getDateOfLog(fileLogName), Date.parse(dateOfFileLog));
  });
});
