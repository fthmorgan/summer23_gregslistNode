import { Schema } from "mongoose";

export const HouseSchema = new Schema
  ({
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    imgUrl: {
      type: String,
      required: false,
      default: '//placehold.it/300x300'
    },
    description: {
      type: String,
      minLength: 3,
      maxLength: 5000
    },
    creatorId:
      { type: Schema.Types.ObjectId, required: true }
  }, {
    timestamps: true, toJSON:
      { virtuals: true }
  })