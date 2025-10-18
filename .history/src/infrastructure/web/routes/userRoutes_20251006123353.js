import express from "express";

export default (UserController) => {
  const router = express.Router();

  router.get("/", UserController.getAllUsers);
  router.put("/ban/:id", UserController.banUser);

  return router;
};
