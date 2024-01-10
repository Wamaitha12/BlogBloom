import mysql from "mysql2"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "Wamaitha.123",
    database: "blog_db",
})