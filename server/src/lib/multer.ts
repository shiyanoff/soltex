import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + ext;
        cb(null, name);
    },
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100mb
    },
});
