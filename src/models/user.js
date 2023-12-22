const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    myAlbums: [{ type: Schema.ObjectId, ref: "album" }],
    albumsShared: [],

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);
const User = model("user", userSchema);

module.exports = User;
