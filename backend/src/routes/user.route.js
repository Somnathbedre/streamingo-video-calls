// import express from "express";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import {
//   acceptFriendRequest,
//   getFriendRequests,
//   getMyFriends,
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   sendFriendRequest,
// } from "../controllers/user.controller.js";

// const router = express.Router();

// // apply auth middleware to all routes
// router.use(protectRoute);

// router.get("/", getRecommendedUsers);
// router.get("/friends", getMyFriends);

// router.post("/friend-request/:id", sendFriendRequest);
// router.put("/friend-request/:id/accept", acceptFriendRequest);

// router.get("/friend-requests", getFriendRequests);
// router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

// export default router;



import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
  deleteAccount, // ✅ NEW
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

// ✅ Final DELETE account route (matches frontend)
router.delete("/delete-account", deleteAccount);

export default router;

