import * as mongoose from 'mongoose';
import * as validator from 'validator';

const Schema = mongoose.Schema;

const listinSchema = new Schema(
  {
    id: {
      type: String,
      id: true,
      generated: true,
    },

    name: {
      type: String,
      required: true,
      jsonSchema: {
        minLength: 5,
        maxLength: 100,
      },
    },
    seller_twitter: {
      type: String,
      validate: {
        validator(seller_twitter: String) {
          return validator.isAlphanumeric(String(seller_twitter));
        },
      },
      required: true,
    },
    price: {
      type: Number,
      jsonSchema: {
        minimum: 0.01,
      },
      validate: {
        validator(price: number) {
          return validator.isNumeric(String(price));
        },
      },
      required: true,
    },
    request_count: {
      type: Number,
      default: 0,
      validate: {
        validator(request_count: Number) {
          return validator.isNumeric(String(request_count));
        },
      },
    },
    paycode: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: true,
      validate: {
        validator(verified: Boolean) {
          return validator.isBoolean(String(verified));
        },
      },
    },
    liked: {
      type: Boolean,
      validate: {
        validator(liked: Boolean) {
          return validator.isBoolean(String(liked));
        },
      },
    },

    deleted_at: {
      type: Date,
      validate: {
        validator(deleted_at: any) {
          return validator.isAlphanumeric(String(deleted_at));
        },
      },
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

export default mongoose.model('Listing', listinSchema);
