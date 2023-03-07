const express = require("express");
const {
  signUpHandler,
  signInHandler,
  refreshTokenHandler,
  logoutHandler,
} = require("../controller/auth.controller");
const { validate } = require("../middleware/validate");
const {
  SignupSchema,
  SigninSchema,
  RefreshSchema,
} = require("../utils/validateRequest");

const router = express.Router();

router.post("/signup", validate(SignupSchema), signUpHandler);
router.post("/signin", validate(SigninSchema), signInHandler);
router.post("/refresh", validate(RefreshSchema), refreshTokenHandler);
router.post("/logout", logoutHandler);

module.exports = router;
