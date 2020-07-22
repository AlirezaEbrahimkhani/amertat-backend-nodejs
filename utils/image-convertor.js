const path = require("path");
const fs = require("fs");
const Logger = require("../utils/logger");

class ImageConverter {
  imageConvertor = (id, image, img_name) => {
    var buffer = Buffer.from(image, "base64");
    const name = `${id}_${img_name}`;
    fs.writeFile(
      path.join(`${path.dirname(require.main.filename)}/public/download`, name),
      buffer,
      (err) => {
        if (err) {
          new Logger("Error while selecting an Image ... !");
        }
      }
    );
    return name;
  };
}

module.exports = ImageConverter;
