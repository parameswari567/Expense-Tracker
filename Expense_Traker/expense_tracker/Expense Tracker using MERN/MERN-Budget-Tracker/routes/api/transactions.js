const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Transaction Model
const Transaction = require("../../models/Transaction");

// Route: GET api/transactions
// Description: Get all transactions
// Access: Private

router.get("/", auth, (req, res) => {
  Transaction.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .then((transactions) => res.json(transactions));
});

// Route: GET api/transactions
// Description: Get a single transaction
// Access: Private

router.get("/:id", auth, (req, res) => {
  Transaction.findById(req.params.id)
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route: POST api/transactions
// Description: Create a transaction
// Access: Private

router.post("/", auth, (req, res) => {
  const newTransaction = new Transaction({
    incomeText: req.body.incomeText,
    incomeAmount: req.body.incomeAmount,
    expenseText: req.body.expenseText,
    expenseAmount: req.body.expenseAmount,
    userId: req.user.id,
  });

  newTransaction
    .save()
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(400).json("Error " + err));
});

// Route: DELETE api/transactions/:id
// Description: Delete an existing transaction
// Access: Private

router.delete("/:id", auth, (req, res) => {
  Transaction.findById({ userId: req.user.id, _id: req.params.id })
    .then((transaction) =>
      transaction.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json("Error " + err));
});
module.exports = router;
