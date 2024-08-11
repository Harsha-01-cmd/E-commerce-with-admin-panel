const router = require("express").Router();
const User = require("../models/user");
const Cloth = require("../models/cloth");
const { authenticateToken } = require("./userAuth");

// ADD CLOTH_ADMIN
router.post("/add-cloth", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "You do not have access to perform this operation" });
    }
    const cloth = new Cloth({
      url: req.body.url,
      title: req.body.title,
      agency: req.body.agency,
      price: req.body.price,
      description: req.body.description
    });
    await cloth.save();
    res.status(200).json({ message: "Cloth added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// UPDATE CLOTH DATA
router.put("/update-cloth/:clothid", authenticateToken, async (req, res) => {
  try {
    const { clothid } = req.params;
    const updatedCloth = await Cloth.findByIdAndUpdate(clothid, {
      url: req.body.url,
      title: req.body.title,
      agency: req.body.agency,
      price: req.body.price,
      description: req.body.description
    }, { new: true });
    
    if (!updatedCloth) {
      return res.status(404).json({ message: "Cloth not found" });
    }
    
    return res.status(200).json({ message: "Details Updated Successfully", data: updatedCloth });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// DELETE A CLOTH
router.delete("/delete-cloth/:clothid", authenticateToken, async (req, res) => {
  try {
    const { clothid } = req.params;
    const deletedCloth = await Cloth.findByIdAndDelete(clothid);

    if (!deletedCloth) {
      return res.status(404).json({ message: "Cloth not found" });
    }

    return res.status(200).json({ message: "Data Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET ALL DATA PUBLIC
router.get("/get-all-cloth-public", async (req, res) => {
  try {
    const cloths = await Cloth.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "Details Fetched Successfully", data: cloths });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET ALL DATA
router.get("/get-all-cloth", authenticateToken, async (req, res) => {
  try {
    const cloths = await Cloth.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "Details Fetched Successfully", data: cloths });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET 4 CLOTHS FOR PUBLIC
router.get("/get-4-cloth-public", async (req, res) => {
  try {
    const cloths = await Cloth.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ message: "Details Fetched Successfully", data: cloths });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET 4 RECENT CLOTHS
router.get("/get-4-cloth", authenticateToken, async (req, res) => {
  try {
    const cloths = await Cloth.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ message: "Details Fetched Successfully", data: cloths });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET CLOTH DETAILS BY ID PUBLIC
router.get("/get-byid-public/:clothid", async (req, res) => {
  try {
    const { clothid } = req.params;
    const cloth = await Cloth.findById(clothid);
    if (!cloth) {
      return res.status(404).json({ message: "Cloth not found" });
    }
    return res.status(200).json({ message: "Details Fetched Successfully", data: cloth });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET CLOTH DETAILS BY ID
router.get("/get-byid/:clothid", authenticateToken, async (req, res) => {
  try {
    const { clothid } = req.params;
    const cloth = await Cloth.findById(clothid);
    if (!cloth) {
      return res.status(404).json({ message: "Cloth not found" });
    }
    return res.status(200).json({ message: "Details Fetched Successfully", data: cloth });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
