import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = ({ gymId, numberOfHours, setMessage }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...`);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = fetch(
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
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2),
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(`Sorry, your transaction could not be processed...${error}`);
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
