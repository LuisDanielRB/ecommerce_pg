const express = require("express");
const router = express.Router();
const { mercadopagoPayment } = require("../controllers/payments-controller");
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
} = require("../controllers/events-controller");
const { fileUpload } = require("../helpers/fileUpload");
const { isUserAuthenticated } = require("../middleware/isAuthenticate");

router.post("/user/google", googleSignIn);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.put("/user/:id/profile", fileUpload, upDateUser);
router.post("/createEvent", createEvent);
router.get("/users", getUsers);
router.get("/events", getEvents);
router.get("/eventsCreate/:id", getEventDetail);
router.post("/payment", mercadopagoPayment);
router.put("/events/:id", deleteEvents);
router.get("/eventsDB/:id", getEventsDetailDb);
router.get("/eventsUsers/:id", getEventsForUsers);

module.exports = router;
