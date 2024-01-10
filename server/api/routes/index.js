const router = require("express").Router();

const auth = require("../auth");
const userController = require("../controller/userApi");


router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.post("/logout", userController.logout);
router.post("/formSubmit", userController.formSubmit);

router.get('/getUser', auth, userController.getUser);


module.exports = router;