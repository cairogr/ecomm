import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
    {
        id: {type: Number},
        name: {type: String, required: true},
      },
      {
        versionKey: false
      }

)

const categories = mongoose.model("categories", categoriesSchema)

export default categories;