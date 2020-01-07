import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator(email: String) {
          return validator.isEmail(String(email));
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(password: String) {
          return validator.isAlpha(String(password));
        },
      },
    },
    twitter_handle: {
      type: String,
      required: true,
      validate: {
        validator(twitter_handle: String) {
          return validator.isAlphanumeric(String(twitter_handle));
        },
      },
    },
    first_name: {
      type: String,
      required: true,
      validate: {
        validator(first_name: String) {
          return validator.isAlpha(String(first_name));
        },
      },
    },
    last_name: {
      type: String,
      required: true,
      validate: {
        validator(last_name: any) {
          return validator.isAlpha(last_name);
        },
      },
    },
    address_line1: {
      type: String,
      required: true,
      validate: {
        validator(address_line1: String) {
          return validator.isAlphanumeric(String(address_line1));
        },
      },
    },
    address_line2: {
      type: String,
      required: true,
      validate: {
        validator(address_line2: String) {
          return validator.isAlphanumeric(String(address_line2));
        },
      },
    },
    suburb: {
      type: String,
      required: true,
      validate: {
        validator(suburb: String) {
          return validator.isAlphanumeric(String(suburb));
        },
      },
    },
    state: {
      type: String,
      required: true,
      validate: {
        validator(state: any) {
          return validator.isAlpha(state);
        },
      },
    },
    postcode: {
      type: String,
      required: true,
      validate: {
        validator(postcode: any) {
          return validator.isAlpha(postcode);
        },
      },
    },
    country: {
      type: String,
      required: true,
      validate: {
        validator(country: any) {
          return validator.isAlpha(country);
        },
      },
    },
    deliver_address_line1: {
      type: String,
      required: true,
      validate: {
        validator(deliver_address_line1: String) {
          return validator.isAlphanumeric(String(deliver_address_line1));
        },
      },
    },
    deliver_address_line2: {
      type: String,
      required: true,
      validate: {
        validator(deliver_address_line2: String) {
          return validator.isAlphanumeric(String(deliver_address_line2));
        },
      },
    },
    delivery_suburb: {
      type: String,
      required: true,
      validate: {
        validator(delivery_suburb: any) {
          return validator.isAlpha(delivery_suburb);
        },
      },
    },
    deliver_state: {
      type: String,
      required: true,
      validate: {
        validator(deliver_state: any) {
          return validator.isAlpha(deliver_state);
        },
      },
    },
    delivery_postcode: {
      type: String,
      required: true,
      validate: {
        validator(delivery_postcode: any) {
          return validator.isAlpha(delivery_postcode);
        },
      },
    },
    delivery_country: {
      type: String,
      required: true,
      validate: {
        validator(delivery_country: any) {
          return validator.isAlpha(delivery_country);
        },
      },
    },
    mobile: {
      type: String,
      required: true,
      validate: {
        validator(mobile: any) {
          return validator.isAlpha(mobile);
        },
      },
    },

    stripe_id: {
      type: String,
      validate: {
        validator(stripe_id: String) {
          return validator.isAlphanumeric(String(stripe_id));
        },
      },
      required: true,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

UserSchema.pre<IUser>('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.pre<IUser>('update', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(
  candidatePassword: string,
): Promise<boolean> {
  let password = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

export default mongoose.model<IUser>('User', UserSchema);
