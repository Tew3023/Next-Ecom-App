"use client";
import MaxWarp from "@/components/MaxWarp";
import { useEffect, useState } from "react";

export default function Products() {
  const [usersData, setUsersData] = useState(null);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({ visible: false, userId: null });
  const [edit, setEdit] = useState({
    visible: false,
    userId: null,
    name: "",
    price: "",
    stock_quantity: "",
    collection: "",
  });

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      if (!res.ok) {
        throw new Error("Cannot get users data");
      }
      return res.json();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      const data = await getUsers();
      setUsersData(data);
    };
    getdata();
  }, []);

  useEffect(() => {
    console.log(usersData);
  }, [usersData]);

  const togglePopup = (id) => {
    setPopup((prevState) => ({
      visible: !prevState.visible,
      userId: id || null,
    }));
  };

  const toggleEditPopup = (user) => {
    setEdit((prevState) => ({
      visible: !prevState.visible,
      userId: user._id || null,
      name: user.name || "",
      price: user.price || "",
      stock_quantity: user.stock_quantity || "",
      collection: user.collection || "",
    }));
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/products`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: popup.userId }),
      });

      if (res.status === 200) {
        console.log("Deleted successfully");
        const data = await getUsers();
        setUsersData(data);
        togglePopup();
      }
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: edit.userId,
          name: edit.name,
          price: edit.price,
          stock_quantity: edit.stock_quantity,
          collection: edit.collection,
        }),
      });

      if (res.status === 200) {
        console.log("Updated successfully");
        const data = await getUsers();
        setUsersData(data);
        toggleEditPopup({});
      }
    } catch (error) {
      console.error("Failed to update the product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!usersData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MaxWarp className={"max-w-full py-10"}>
        {popup.visible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <h1 className="text-lg mb-4">
                Are you sure you want to delete this product?
              </h1>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={togglePopup}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {edit.visible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md text-center w-96">
              <h1 className="text-lg mb-4">Edit Product Information</h1>
              <div className="flex flex-col gap-4">
                <label className="text-sm font-light text-left">
                  Product Name
                  <input
                    name="name"
                    onChange={handleChange}
                    value={edit.name}
                    className="px-4 py-2 rounded-sm w-full"
                    type="text"
                    placeholder="Product Name"
                  />
                </label>
                <label className="text-sm font-light text-left">
                  Price
                  <input
                    name="price"
                    onChange={handleChange}
                    value={edit.price}
                    className="px-4 py-2 rounded-sm w-full"
                    type="text"
                    placeholder="Price"
                  />
                </label>
                <label className="text-sm font-light text-left">
                  Stock Quantity
                  <input
                    name="stock_quantity"
                    onChange={handleChange}
                    value={edit.stock_quantity}
                    className="px-4 py-2 rounded-sm w-full"
                    type="number"
                    placeholder="Stock Quantity"
                  />
                </label>
                <label className="text-sm font-light text-left">
                  Collection
                  <input
                    name="collection"
                    onChange={handleChange}
                    value={edit.collection}
                    className="px-4 py-2 rounded-sm w-full"
                    type="text"
                    placeholder="Collection"
                  />
                </label>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-300 text-black rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => toggleEditPopup({})}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <table className="w-full">
          <caption class="caption-top uppercase">
            products information 
          </caption>
          <thead>
            <tr>
              <th className="px-3 py-2 text-left bg-zinc-100 text-md ">
                No.
              </th>
              <th className="px-3 py-2 text-left bg-zinc-100 ">
                Name
              </th>
              <th className="px-3 py-2 text-left bg-zinc-100 ">
                Image
              </th>
              <th className="px-3 py-2 text-left bg-zinc-100 ">
                Price
              </th>
              <th className="px-3 py-2 text-left bg-zinc-100 ">
                Collection
              </th>
              <th className="px-3 py-2 text-left bg-zinc-100 ">
                Quantity
              </th>
              <th className="px-3 py-2 text-center bg-zinc-100 ">
                Edit
              </th>
              <th className="px-3 py-2 text-center bg-zinc-100 ">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.shoes.map((item, index) => (
              <tr key={item._id}>
                <td className="px-3 ">{index + 1}</td>
                <td className="px-3 ">{item.name}</td>
                <td className="px-3  flex justify-center">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-20 h-20 rounded-sm mx-5 my-2"
                  />
                </td>
                <td className="px-3 ">{item.price}</td>
                <td className="px-3 ">
                  {item.collection}
                </td>
                <td className="px-3 ">
                  {item.stock_quantity}
                </td>
                <td className="px-3  text-center">
                  <button
                    onClick={() => toggleEditPopup(item)}
                    className="px-2 py-1 bg-green-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-3 text-center">
                  <button
                    onClick={() => togglePopup(item._id)}
                    className="px-2 py-1 bg-red-500 text-white  rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MaxWarp>
    </div>
  );
}
