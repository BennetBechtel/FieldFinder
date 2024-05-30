import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAppContext } from "../../contexts/AppContext";

const PayPalPayment = ({ gymId, numberOfHours, bookGym, validateCheckout }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  const { showToast } = useAppContext();

  const createOrder = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gyms/${gymId}/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfHours }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        showToast({
          message: "PayPal Checkout fehlgeschlagen...",
          type: "ERROR",
        });
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      showToast({
        message: "PayPal Checkout fehlgeschlagen...",
        type: "ERROR",
      });
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const available = await validateCheckout();
      if (!available.message === "Valid date") {
        throw new Error("Invalide date");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/gyms/${gymId}/orders/${data.orderID}/capture`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const orderData = await response.json();
      // Three cases to handle:
      //  (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //  (2) Order non-recoverable errors -> Show a failure message
      //  (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        showToast({
          message: "PayPal Checkout fehlgeschlagen...",
          type: "ERROR",
        });
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction = orderData.purchase_units[0].payments.captures[0];
        bookGym({ ...FormData, totalCost: Number(transaction.amount.value) });
      }
    } catch (error) {
      console.error(error);
      showToast({
        message: "PayPal Checkout fehlgeschlagen...",
        type: "ERROR",
      });
    }
  };

  return (
    <PayPalButtons
      style={{
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
      }}
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
};

export default PayPalPayment;
