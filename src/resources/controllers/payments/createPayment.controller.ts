import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import mercadopago from "mercadopago";
import { Order, OrderDetail, Payment } from "../../models";
mercadopago.configurations.setAccessToken(
  process.env.MERCADO_PAGO_ACCESS_TOKEN
);

export const createPaymentController = catchAsync(
  messages("ERROR_CONTROLLER", "createPaymentController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;

    const { payment_data, order_id } = req.body;

    const existOrder = await Order.findById(order_id);

    if (!existOrder) {
      return res.status(404).json({
        message: messages("ORDER_NOT_EXIST", "", language),
      });
    }

    if (existOrder.state !== "PENDING") {
      return res.status(404).json({
        message: messages("ORDER_USED", "", language),
      });
    }

    await mercadopago.payment
      .save({
        ...payment_data,
        transaction_amount: Number(existOrder.payment_amount),
      })
      .then(async ({ response }) => {
        if (
          response.status === "approved" ||
          response.status === "pending" ||
          response.status === "in_process"
        ) {
          const newPayment = await Payment.create({
            ...response,
            order_id,
            payment_id: response.id,
          });

          await Order.findByIdAndUpdate(order_id, { state: "IN_PROGRESS" });

          return res.status(200).json({
            message: messages("OK", "", language),
            payment: newPayment,
          });
        }

        await Order.findByIdAndRemove(order_id);
        await OrderDetail.deleteMany({ order_id: order_id });

        return res.status(400).json({
          message: messages("FAILED_PAYMENT", "", language),
          status: response.status,
          status_detail: response.status_detail,
        });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
);
