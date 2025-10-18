import express from "express";

export default (UserController) => {
  const router = express.Router();

  router.get("/", UserController.getAllUsers); // GET all users
  router.get("/pet-owners", UserController.getPetOwners); // GET only clients
  router.put("/ban/:id", UserController.banUser); // Ban a user

  return router;
};
