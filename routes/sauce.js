// VARIABLES FOR REQUIEREMENTS //
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const saucesCtrl = require("../controllers/sauce");

// PATH FOR THE SAUCE ROUTES //
router.post("", auth, multer, saucesCtrl.createSauce);
router.get("", auth, saucesCtrl.getAllSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

// EXPORT ROUTES //
module.exports = router;