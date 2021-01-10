var express = require("express"),
  Formidable = require("formidable"),
  path = require("path");

const uploadDir = path.join(__dirname, "/uploads");

const app = express();
app.use(express.json());

app.post("/", (req, res, next) => {
  let data = {};
  var form = new Formidable.IncomingForm();
  form.multiples = true;
  form.keepExtensions = true;
  form.uploadDir = uploadDir;

  //   Target when a file begin to upload
  form.on("fileBegin", (name, file) => {
    const [fileName, fileExt] = file.name.split(".");
    const newFileName = `${fileName}_${new Date().getTime()}.${fileExt}`;
    data.file = newFileName;
    file.path = path.join(uploadDir, newFileName);
  });

  form.parse(req, (err, fields, files) => {
    //get other fields
    data = { ...data, ...fields };
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ uploaded: true, data });
  });
});
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
