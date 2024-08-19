"use client";
import Axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import randomInteger from 'random-int';

export default function AddToCart({ filteredData }) {
  const [element, setElement] = useState(false);
  const [size, setSize] = useState("");

  const showSize = () => {
    setElement(!element);
  };



  const sizeOptions = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const addToCart = async () => {
    try {
      if (!size) {
        console.log("Please select a size before adding to cart");
        return;
      }
  
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      
      const existingItem = storedCartItems.find(item => item.name === filteredData.name && item.size === size);
      
      if (existingItem) {
 
        existingItem.quantity += 1;
      } else {
        // Parse the price from filteredData
        const price = parseFloat(filteredData.price.replace(/[^0-9.-]+/g, ""));
        
        const cartItem = {
          name: filteredData.name,
          url: filteredData.url,
          size: size,
          price: price,
          quantity: 1,
          collection: filteredData.collection
        };
        
        // Add the new item to the cart
        storedCartItems.push(cartItem);
      }
  
      // Store updated cart items back to localStorage
      localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
      
      console.log("Item added to cart successfully!");
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  return (
    <div className="space-y-3">
      <Box sx={{ maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="size-select-label">Size</InputLabel>
          <Select
            labelId="size-select-label"
            id="size-select"
            value={size}
            label="Size"
            onChange={handleChange}
          >
            {sizeOptions.map((sizeOption, index) => (
              <MenuItem key={index} value={sizeOption}>
                {sizeOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <button onClick={showSize} className="text-md underline underline-offset-2">
        Find your size
      </button>
      {element && (
        <div className="text-sm mt-2">
          {/* Add size guide or additional info here */}
          <p>Size guide information...</p>
        </div>
      )}
      <button
        onClick={addToCart}
        className={`w-full border border-black rounded-full h-12 ${!size ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!size}  // Disable button until size is selected
      >
        Add to cart
      </button>
    </div>
  );
}
