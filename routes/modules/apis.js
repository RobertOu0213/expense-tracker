const express = require("express");
const router = express.Router();
const Category = require("../../models/category");
const Record = require("../../models/record");

router.get("/records", async (req, res, next) => {
  try {
    const chart = {};
    const userId = req.user._id;
    const { categoryId } = req.query;
    const category = await Category.find({ name: categoryId }).lean();

    chart.userId = userId;
    if (category.length) {
      chart.categoryId = category[0]._id;
    }

    const aggregation = [
      { $match: chart },
      {
        $group: {
          _id: "$categoryId",
          subTotalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category_docs",
        },
      },
      { $sort: { subTotalAmount: -1 } },
    ];

    return Record.aggregate(aggregation)
      .exec()
      .then((records) => {
        if (!records.length && category)
          return res.json({
            status: "error",
            message: "查無資料，請確認您的篩選條件",
          });
        return res.json(records);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
