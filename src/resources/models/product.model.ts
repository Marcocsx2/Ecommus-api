import { model, Schema } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

let validState = {
  values: ["Inactivo", "Activo", "Agotado"],
  message: "{VALUE} no es un estado valido",
};

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    trademark: {
      type: String,
      required: true,
    },
    photo: {
      type: Array,
      default:
        "https://wws.com.pa/wp-content/plugins/wordpress-ecommerce/marketpress-includes/images/default-product.png",
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      default: "Activo",
      enum: validState,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    detail: {
      type: Schema.Types.String,
      default: "<p> No detail </p>",
    },
    description: {
      type: Schema.Types.String,
      default: "<p> No description </p>",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    reviews: [reviewSchema],
    likes: [likeSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    totalReviews: {
      type: Number,
      requiered: true,
      default: 0,
    },
    totalLikes: {
      type: Number,
      requiered: true,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePagination);

const Product = model("Product", productSchema);
export default Product;
