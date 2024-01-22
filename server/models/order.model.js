const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const AddressSchema = new Schema(
  {
    name: { type: String, required: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { _id: false }
);

const OrderItemSchema = new Schema(
  {
    product: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, default: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    totalOrderPrice: { type: Number, required: true },
    name: { type: String, required: true },
    shippingDetails: { type: AddressSchema, required: true },
  },
  {
    timestamps: true,
  }
);

const OrderModel = models.order || model("order", OrderSchema);

const OrderCreateValidationSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().strict().required(),
        quantity: Joi.number().strict().required(),
        price: Joi.number(),
      })
    )
    .strict()
    .required(),
  shippingDetails: Joi.object({
    line1: Joi.string().strict().required(),
    line2: Joi.string(),
    city: Joi.string().strict().required(),
    postalCode: Joi.string().strict().required(),
    country: Joi.string().strict().required(),
  })
    .strict()
    .required(),
});

const OrderUpdateValidationSchema = OrderCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
});

module.exports = {
  OrderModel,
  OrderCreateValidationSchema,
  OrderUpdateValidationSchema,
};
