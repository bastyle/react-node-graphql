const {
    addUser,
    deleteUser,
    getAllUsers,
    getUserById,
    login,
  } = require("../controller/userController");
  
  const router = require("express").Router();
  
  router.post("/", addUser);
  router.delete("/:id", deleteUser);
  router.get("/", getAllUsers);
  router.get("/:id", getUserById);
  router.post("/login", login);
  
  module.exports = router;