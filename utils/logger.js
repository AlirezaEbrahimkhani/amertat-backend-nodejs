const fs = require("fs");
const path = require("path");

class Logger {
  constructor(message) {
    fs.appendFileSync(
      `${path.dirname(require.main.filename)}/log/database-log.txt`,
      `${message}\n`
    );
  }
}

module.exports = Logger;
