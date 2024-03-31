const mysql = require('mysql2/promise');

exports.handler = async (event, context) => {
  try {
    const { title, author, isbn, published_year, genre } = JSON.parse(event.body);
 


    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const sql = 'INSERT INTO pramal1 (title, author, isbn, published_year, genre) VALUES (?, ?, ?, ?, ?)';
    await connection.execute(sql, [title, author, isbn, published_year, genre]);
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Book created successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create book." }),
    };
  }
};
