const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const dir = path.join(__dirname, "../../logs");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const infoStream = fs.createWriteStream(dir + "/info.log");

const errorStream = fs.createWriteStream(dir + "/error.log");

const debugStream = fs.createWriteStream(dir + "/debug.log");

const requestStream = fs.createWriteStream(dir + "/request.log");

const globalStream = fs.createWriteStream(dir + "/global.log");

const Rainbogger = {
  /**
   * Function to log info.
   * @param msg
   */
  info: (msg) => {
    const message = "[INFO] " + new Date().toLocaleString() + ": " + msg + "\n";
    infoStream.write(message);
    console.log(chalk.green(message));
    global(message);
  },
  /**
   * Function to log error.
   * @param msg
   */
  error: (msg) => {
    const message =
      "[ERROR] " + new Date().toLocaleString() + ": " + msg + "\n";
    errorStream.write(message);
    console.log(chalk.red(message));
    global(message);
  },
  /**
   * Function to log debug.
   * @param msg
   */
  debug: (msg) => {
    const message =
      "[DEBUG] " + new Date().toLocaleString() + ": " + msg + "\n";
    debugStream.write(message);
    console.log(chalk.yellow(message));
    global(message);
  },
  /**
   * Function to log request.
   * @param msg
   */
  request: (msg) => {
    const message =
      "[REQUEST] " + new Date().toLocaleString() + ": " + msg + "\n";
    requestStream.write(message);
    console.log(chalk.cyan(message));
    global(message);
  },
};

function global(message) {
  globalStream.write(message);
}

module.exports = Rainbogger;
