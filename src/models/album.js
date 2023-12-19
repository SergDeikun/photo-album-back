const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const albumSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    backgroundURL: String,
    photo: [{ type: Schema.ObjectId, ref: "photo" }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    viewers: [],
  },
  { versionKey: false, timestamps: true }
);

albumSchema.post("save", handleSaveErrors);
const Album = model("album", albumSchema);

module.exports = Album;
