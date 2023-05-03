import mongoose, { Schema } from "mongoose";

const offerSchema = new Schema({
  code: { type: String, required: true, maxlength: 8 },
  title: { type: String, required: true, maxlength: 60 },
  description: { type: String, maxlength: 140 },
  type: { type: String, required: true },
  discountPercent: { type: Number },
  applicableOn: { type: String },
  minOrderValue: { type: Number },
  maxDiscount: { type: Number },
  startDate: { type: Date, required: true },
  expirationDate: { type: String, required: true },
  numCustomers: { type: Number },
  totalCustomers: { type: Number },
  usePerCustomer: { type: Number },
  usagePerCustomer: { type: Number },
});

export const Offer = mongoose.model("Offer", offerSchema);
