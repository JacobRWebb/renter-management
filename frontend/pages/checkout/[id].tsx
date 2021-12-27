import { Elements } from "@stripe/react-stripe-js";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CheckoutForm from "../../components/form/CheckoutForm";
import { wrapper } from "../../store";
import { axiosInstance, stripePromise } from "../../util/constants";
import { checkToken } from "../../util/preRun";

const CheckoutPageID: NextPage<{ clientSecret: string }> = ({
  clientSecret,
}) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {id} - {clientSecret}
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance: { theme: "stripe" } }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const token = ctx.req.cookies.token;
    if (token) {
      await checkToken(store, token);
      if (store.getState().auth.user) {
        const itemId = ctx.query.id;
        if (itemId) {
          try {
            const paymentIntent = await axiosInstance.post(
              "stripe/createPaymentIntent",
              {
                itemId,
                token,
              }
            );

            if (paymentIntent.data.clientSecret) {
              return {
                props: {
                  clientSecret: paymentIntent.data.clientSecret,
                },
              };
            }
          } catch (e) {
            console.log("Problem with creating payment intent");
          }
        }
      }
    }

    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  };
});

export default CheckoutPageID;
