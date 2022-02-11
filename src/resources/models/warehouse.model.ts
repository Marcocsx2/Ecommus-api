import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

let WarehouseSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: {
    type: String,
    unique: false,
    required: true,
  },
  lat: {
    type: Number,
    unique: false,
    required: true,
  },
  lon: {
    type: Number,
    unique: false,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  country_code:{
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    unique: false,
    required: true,
  },
  main_phone: {
    type: String,
    unique: false,
    required: true,
  },
  phone_ext: {
    type: String,
    unique: false,
    required: false,
  },
  postal_code: {
    type: String,
    unique: false,
    required: true,
  }
});

WarehouseSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});

const Warehouse = model("Warehouse", WarehouseSchema);

export default Warehouse;
