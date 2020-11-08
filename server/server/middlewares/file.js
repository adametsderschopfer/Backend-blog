import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },

  filename(req, file, cb) {
    const filename = `${Date.now()}_${file.originalname.trim()}`;
    cb(null, filename);
  },
});

const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({
  storage,
  fileFilter,
});
