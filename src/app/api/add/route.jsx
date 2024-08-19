import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { id, name, url, price, size, collection, quantity } =
      await request.json();

    // Check for required fields and validate data types
    if (!id || !name || !url || isNaN(Number(price)) || !size || !collection || isNaN(quantity)) {
      return new Response(
        JSON.stringify({ message: "Invalid data provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Adjust SQL query to match the schema
    const query = `
      INSERT INTO cart (id, name, url, price, size, collection, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Convert price to a number if needed
    const numericPrice = Number(price);
    
    const [results] = await pool.query(query, [id, name, url, numericPrice, size, collection, quantity]);

    if (results.affectedRows === 1) {
      return new Response(
        JSON.stringify({ message: "Added to cart successfully" }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Failed to add to cart" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
