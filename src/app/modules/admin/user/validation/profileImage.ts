// For File Uploads
import { v4 as uuidv4 } from "uuid";
import * as multer from "multer";
import * as path from "path";
import * as slugify from "@sindresorhus/slugify";
import * as fs from "fs";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    req.body.uuid = req.params.uuid ? req.params.uuid : uuidv4();
    const dir = `./public/user_files/${slugify(req.body.uuid, {
      separator: "-",
    })}/`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(
      null,
      slugify(`profile_picture_` + new Date().getTime() + file.originalname) +
        path.extname(file.originalname)
    );
  },
});

export default multer({ storage: storage });
