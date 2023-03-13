const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const photoSchema = new Schema(
  {
    place: String,
    date: String,
    photoURL: {
      type: String,
      required: true,
    },
    comments: String,
    // albumId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "album",
    // },
    albumId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

photoSchema.post("save", handleSaveErrors);
const Photo = model("photo", photoSchema);

module.exports = Photo;
