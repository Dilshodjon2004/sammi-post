const {v4: uuidv4} = require("uuid");
const fs = require("fs"); // file system
const path = require("path");

class FileService {
  save(file) {
    try {
      const fileName = uuidv4() + ".jpg";
      const currentDir = __dirname;
      const staticDir = path.join(currentDir, "..", "static"); //static folder making
      const filePath = path.join(staticDir, fileName); // file path making

      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, {recursive: true});
      }

      file.mv(filePath); // file moving to the path

      return fileName;
    } catch (error) {
      throw new Error(`Error saving file: ${error}`);
    }
  }
}

module.exports = new FileService();
