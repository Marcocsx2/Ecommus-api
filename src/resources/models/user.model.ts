import mongoose, { model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongooseHidden from "mongoose-hidden";
import mongoosePagination from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

let validRoles = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol valido",
};

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "El nombre completo es necesario"],
    },
    photo: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
    role: {
      type: String,
      default: "USER_ROLE",
      enum: validRoles,
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatorio"],
      hide: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    google: {
      type: Boolean,
      default: false,
    },
    online: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

userSchema.methods.checkPassword = function (user, password: string) {
  const passwordHash = user.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject: any = user.toObject();
  delete userObject.password;

  return userObject;
};

userSchema.plugin(mongooseHidden);
userSchema.plugin(mongoosePagination);
userSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});

const User = model("User", userSchema);

export default User;
