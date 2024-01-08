import http from "http";
import fs from "fs";

const PORT = 3000;

const fetchHtmlPath = "./index.html"
// const xhrHtmlPath = "./xhr.html"

const connection = mysql.createServer({
  host: "localhost",
  user: "root",
  password: "1108",
  database: "product",  // db 이름
});

const server = http.createServer((req, res) => {
  if (res.method === "GET" && req.url === "/") {
    fs.readFile(fetchHtmlPath, 'utf8', (err, data) => {
      fs.writeHead(200, { "Content-Type" : "text/html" });
    });
  }
  else if (req.method === "GET" && req.url === "/mariaDB") {
    const query = "SELECT * FROM product";

    connection.query(query, (error, result) => {
      if (error) {
        res.writeHead(500, { "Content-Type" : "application/json" });
        res.end(JSON.stringify({ error : "Internal Server Error" }));
      }
      else {
        res.writeHead(200, { "Content-Type" : "application/json" });
        res.end(JSON.stringify(result));
      }
    })
  }
})

server.listen(PORT, () => {
  console.log(`
Server running at http://localhost:${PORT}
  `);
});