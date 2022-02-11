import mongoose, { model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import moment from "moment-timezone";

let Schema = mongoose.Schema;

let secretCodeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    default: true,
    unique: true,
  },
  dateCreated: {
    type: Date,
    default: moment(Date.now()).tz("America/Lima").format(),
    index: { expires: 900 },
  },
});

secretCodeSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});
const SecretCode = model("Secret_Code", secretCodeSchema);

export default SecretCode;
