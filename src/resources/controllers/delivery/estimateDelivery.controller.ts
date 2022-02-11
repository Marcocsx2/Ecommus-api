import { axiosGlovoClient } from "../../../utils/axios";
import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Address, Product, Warehouse } from "../../models";

export const estimateDeliveryController = catchAsync(
  messages("ERROR_CONTROLLER", "estimateDeliveryController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;

    const { data: body } = req.body;

    const data = [];
    const amount = [];

    for (let i = 0; i < body.length; i++) {
      const element = body[i];
      const getProduct = await Product.findById(element.product_id).populate(
        "author",
        "fullname photo"
      );
      const getAddress = await Address.findById(element.address_id);
      const getWarehouse = await Warehouse.findById(getProduct.warehouse);

      let structure = {
        product: getProduct,
        description: getProduct.name + " " + getProduct.trademark,
        addresses: [
          {
            type: "PICKUP",
            lat: getWarehouse.lat,
            lon: getWarehouse.lon,
            label: getWarehouse.address,
          },
          {
            type: "DELIVERY",
            lat: getAddress.lat,
            lon: getAddress.lon,
            label: getAddress.address,
          },
        ],
      };

      data.push(structure);
    }

    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      console.log("Elementos de delivery", element);

      await axiosGlovoClient({
        method: "POST",
        url: "/b2b/orders/estimate",
        data: {
          description: element.description,
          addresses: element.addresses,
        },
      })
        .then(({ data }) => {
          let structure = {
            product: element.product,
            data,
          };
          amount.push(structure);
        })
        .catch((err) => {
          console.log("Error en delivery", err);

          return res.status(400).json({
            message:
              "La dirección que selecciono no esta en el alcance del delivery",
          });
        });
    }

    return res.status(200).json({
      message: "Productos estimados",
      amount,
    });
  }
);
