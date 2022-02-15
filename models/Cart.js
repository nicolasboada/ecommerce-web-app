const mongoose = require("mongoose");

// const CartSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     products: [
//       {
//         productId: { type: String },
//         size: { type: String },
//         color: { type: String },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        // _id: mongoose.Schema.Types.ObjectId,
        productId: { type: String },
        img: { type: String },
        title: { type: String },
        price: { type: Number },
        size: { type: String },
        color: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    // default: undefined
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
