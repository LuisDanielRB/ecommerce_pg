const express = require("express");
const router = express.Router();
const { mercadopagoPayment } = require("../controllers/payments-controller");
const passport = require("passport");
const {
  register,
  login,
  getUsers,
  logout,
  upDateUser,
  googleSignIn,
} = require("../controllers/users-controller");
const {
  createEvent,
  getEvents,
  getEventDetail,
  getEventsDetailDb,
  deleteEvents,
  getEventsForUsers,
  updateEvent,
} = require("../controllers/events-controller");
const { fileUpload } = require("../helpers/fileUpload");
const { isUserAuthenticated } = require("../middleware/isAuthenticate");
const { sendMailWelcome } = require("../controllers/email-controller");
const successLoginUrl = "http://localhost:5173/login/success";
const errorLoginUrl = "http://localhost:5173/login/error";

router.post("/user/google", googleSignIn);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.put("/user/:id/profile", fileUpload, upDateUser);
router.post(
  "/createEvent",
  passport.authenticate("jwt-auth", { session: false }),
  fileUpload,
  createEvent
);
router.post("/event/:id/update", fileUpload, updateEvent);
router.get("/users", getUsers);
router.get("/events", getEvents);
router.get("/eventsCreate/:id", getEventDetail);
router.post("/payment", mercadopagoPayment);
router.put("/events/:id", deleteEvents);
router.get("/eventsDB/:id", getEventsDetailDb);
router.get("/eventsUsers/:id", getEventsForUsers);
router.post("/email", sendMailWelcome);

module.exports = router;
