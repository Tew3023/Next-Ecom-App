'use client'
import { useEffect,useState } from "react";
import Axios from "axios";

export default function PaymentSuccess({ searchParams }) {
    const amount = searchParams.amount;
    const [cart, setCart] = useState([]);

    useEffect(() => {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCart(JSON.parse(storedCartItems));
      }
      
    }, []);

    useEffect(()=>{
      console.log('cart : ',cart)
    },[cart])

    useEffect(()=>{
      const addDataToDataBase = async () => {
        try {
          console.log("Payment successful, proceeding with order creation...");
          await Promise.all(
            cart.map(async (item) => {
              try {
                const res = await Axios.post("/api/order", {
                  productName: item.name,
                  url: item.url,
                  price: item.price,
                  type: item.collection,
                  quantity: item.quantity,
                  size: item.size,
                  user: userdata.email,
                  firstname: userdata.firstname,
                  lastname: userdata.lastname,
                  address: userdata.address,
                  phone: userdata.phone,
                  city: userdata.city,
                  province: userdata.province,
                  postalcode: userdata.postal,
                });
                if (res.status === 200) {
                  console.log("Order created successfully", res.data);
                } else {
                  console.error("Failed to create order", res.status, res.data);
                  setErrorMessage(
                    `Failed to create order for ${item.name}. Please contact support.`
                  );
                }
              } catch (error) {
                console.error(
                  "Error creating order:",
                  error.response ? error.response.data : error.message
                );
                setErrorMessage(
                  `Error creating order for ${item.name}. Please try again or contact support.`
                );
              }
            })
          );
        } catch (error) {
          console.log("There was an issue with the order:", error);
          setErrorMessage(
            "There was an issue processing your order. Please try again."
          );
        }
      };
      addDataToDataBase();
    },[cart])

   
  
    return (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">You successfully sent</h2>
  
          <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
            ${amount}
          </div>
        </div>
      </main>
    );
  }
  