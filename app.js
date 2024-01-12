// import http from "http";
// import fs from "fs";
// import mysql from "mysql";
const http = require("http");
const fs = require("fs");
const mysql = require("mysql")


const PORT = 3000;

const fetchHtmlPath = "./index.html"
const xhrHtmlPath = "./xhr.html"


const connection = mysql.createConnection({  // createServer가 아닌 createConnection을 사용해야 합니다.
  host: "localhost",
  user: "root",
  password: "1108",
  database: "dbproject",
});

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {  // res.method 대신 req.method을 사용해야 합니다.
    fs.readFile(fetchHtmlPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.method === "GET" && req.url === "/product") {
    const query = "SELECT * FROM product";

    connection.query(query, (error, result) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`
Server running at http://localhost:${PORT}
  `);
});
