var express = require("express"),
  Formidable = require("formidable"),
  fs = require("fs"),
  path = require("path");

const uploadDir = path.join(__dirname, "/uploads");

const app = express();

app.post("/", (req, res, next) => {
  var form = new Formidable.IncomingForm();
  form.multiples = true;
  form.keepExtensions = true;
  form.uploadDir = uploadDir;

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ uploaded: true });
  });

  form.on("fileBegin", (name, file) => {
    const [fileName, fileExt] = file.name.split(".");
    file.path = path.join(
      uploadDir,
      `${fileName}_${new Date().getTime()}.${fileExt}`
    );
  });
});

const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
