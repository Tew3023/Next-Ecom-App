"use client";
import MaxWarp from "@/components/MaxWarp";
import { useEffect, useState } from "react";

export default function Users() {
  const [usersData, setUsersData] = useState(null);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({ visible: false, userId: null });
  const [edit, setEdit] = useState({
    visible: false,
    userId: null,
    firstname: "",
    lastname: "",
    email: "",
  });

  const getUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
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
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
    }));
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/users`, {
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
      console.error("Failed to delete the user:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/admin/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: edit.userId,
          firstname: edit.firstname,
          lastname: edit.lastname,
          email: edit.email,
        }),
      });

      if (res.status === 200) {
        console.log("Updated successfully");
        const data = await getUsers();
        setUsersData(data);
        toggleEditPopup({});
      }
    } catch (error) {
      console.error("Failed to update the user:", error);
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
                Are you sure you want to delete this user?
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
              <h1 className="text-lg mb-4">Edit User Information</h1>
              <div className="flex flex-col gap-4">
                <label className="text-sm font-light text-left">
                  First Name
                  <input
                    name="firstname"
                    onChange={handleChange}
                    value={edit.firstname}
                    className="px-4 py-2 rounded-sm"
                    type="text"
                    placeholder="First Name"
                  />
                </label>
                <label className="text-sm font-light text-left">
                  Last Name
                  <input
                    name="lastname"
                    onChange={handleChange}
                    value={edit.lastname}
                    className="px-4 py-2 rounded-sm"
                    type="text"
                    placeholder="Last Name"
                  />
                </label>
                <label className="text-sm font-light text-left">
                  Email
                  <input
                    name="email"
                    onChange={handleChange}
                    value={edit.email}
                    className="px-4 py-2 rounded-sm"
                    type="email"
                    placeholder="Email"
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
            Users information 
          </caption>
          <thead>
            <tr>
              <th className="px-3 py-2 text-left bg-zinc-100 text-md">No.</th>
              <th className="px-3 py-2 text-left bg-zinc-100">First Name</th>
              <th className="px-3 py-2 text-left bg-zinc-100">Last Name</th>
              <th className="px-3 py-2 text-left bg-zinc-100">Email</th>
              <th className="px-3 py-2 text-left bg-zinc-100">Role</th>
              <th className="px-3 py-2 text-center bg-zinc-100">Edit</th>
              <th className="px-3 py-2 text-center bg-zinc-100">Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersData.users.map((item, index) => (
              <tr key={item._id}>
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{item.firstname}</td>
                <td className="px-3 py-2">{item.lastname}</td>
                <td className="px-3 py-2">{item.email}</td>
                <td className="px-3  py-2">{item.role}</td>
                <td className="px-3 text-center  py-2">
                  <button
                    onClick={() => toggleEditPopup(item)}
                    className="px-2  py-2 rounded-md bg-green-600 text-white"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-3 text-center">
                  <button
                    onClick={() => togglePopup(item._id)}
                    className="px-2  py-2 rounded-md bg-red-600 text-white"
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
