const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const dir = path.join(__dirname, "../../logs");
const nHistory = 5;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
} else {
  const files = fs.readdirSync(dir);
  if (files.length > nHistory * 4) searchOldestAndDelete(dir, files);
}

const date = new Date().toISOString();
const dateString = customParseDate(date);

const infoStream = fs.createWriteStream(dir + `/info#${dateString}.log`);
infoStream.write(date);

const errorStream = fs.createWriteStream(dir + `/error#${dateString}.log`);
errorStream.write(date);

const debugStream = fs.createWriteStream(dir + `/debug#${dateString}.log`);
debugStream.write(date);

const requestStream = fs.createWriteStream(dir + `/request#${dateString}.log`);
requestStream.write(date);

const globalStream = fs.createWriteStream(dir + `/global#${dateString}.log`);
globalStream.write(date);

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

function customParseDate(date) {
  const slashReplacer = new RegExp("/", "g");
  return (
    date
      .replace(" ", "_")
      .replace(slashReplacer, "-")
      .replace(":", "h")
      .replace(":", "m") + "s"
  );
}

function getDateOfLog(file) {
  const rawDate = file
    .split("#")[1]
    .split(".")[0]
    .replace("_", " ")
    .replace("h", ":")
    .replace("m", ":");
  return Date.parse(rawDate);
}

function searchOldestAndDelete(dir, files) {
  let oldestDate = new Date();
  files.forEach((file) => {
    const date = getDateOfLog(file);
    oldestDate = oldestDate > date ? date : oldestDate;
  });
  files.forEach((file) => {
    const date = getDateOfLog(file);
    if (date == oldestDate) fs.unlinkSync(`${dir}/${file}`);
  });
}

module.exports = Rainbogger;
