const mongoose = require("mongoose");

const balcklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
  },
  {
    timestamps: true,
  },
);

const tokenBlacklistModel = mongoose.model(
  "blacklistTokens",
  balcklistTokenSchema,
);

module.exports = tokenBlacklistModel;
