// import express from "express";
// import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// router.post("/onboarding", protectRoute, onboard);

// // check if user is logged in
// router.get("/me", protectRoute, (req, res) => {
//   res.status(200).json({ success: true, user: req.user });
// });

// export default router;





//by gpt added forgot pass
import express from "express";
import {
  login,
  logout,
  onboard,
  signup,
  sendOtp,         // ✅ renamed from sendResetOtp
  verifyOtp,       // ✅ renamed from verifyResetOtp
  resetPassword,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// ✅ Forgot Password Routes
router.post("/send-reset-otp", sendOtp);        // ✅ uses sendOtp
router.post("/verify-reset-otp", verifyOtp);    // ✅ uses verifyOtp
router.post("/reset-password", resetPassword);

// ✅ Onboarding
router.post("/onboarding", protectRoute, onboard);

// ✅ Check Authenticated User
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;


