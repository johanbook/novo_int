const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const Document = require("../../models/Document");

// @ desc    Get ALL documents
// @ route    GET api/documents
// @ access   Public
router.get("/", (req, res) => {
    Document.find()
        .sort({ date: -1 })
        .then(documents => res.json(documents))
});

// @ desc    Create A New document
// @ route    POST api/documents
// @ access   Private
router.post("/", auth, (req, res) => {
    // Create document:
    const newdocument = new Document({
        name: req.body.name
    });
    // Save document to DB:
    newdocument.save().then(document => res.json(document));
});

// @ route    POST api/documents/:id
// @ desc    Delete a document:
// @ access   Private
router.delete("/:id", auth, (req, res) => {
    Document.findById(req.params.id)
        .then(document => document.remove().then(() => res.json({success: "Successfully Removed!"})))
        .catch(err => res.status(404).json({failed: "Failed to remove document..."}))
})

module.exports = router;
