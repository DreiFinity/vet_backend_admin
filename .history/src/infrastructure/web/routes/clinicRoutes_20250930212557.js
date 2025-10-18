import express from "express";
import multer from "multer";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

export default function clinicRoutes(clinicController) {
  router.post("/", upload.single("image"), clinicController.createClinic);
  router.get("/", clinicController.getClinics);

  return router;
}
