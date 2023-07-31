const http = require("http");
const EventEmitter = require('events');
const fs = require('fs');

const newsletterEmitter = new EventEmitter();
const PORT = 5500;

http.createServer((req, res) => {
  const chunks = [];
  req.on("data", (packet) => {
    chunks.push(packet);
  });

  req.on("end", () => {
    if (req.url === '/newsletter_signup' && req.method === 'POST') {
      const postData = JSON.parse(Buffer.concat(chunks).toString());
      const { name, email } = postData;
      newsletterEmitter.emit("newsletter_signup", postData);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("subscribed to the newsletter");
      res.end();
    } else {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.write("not found");
      res.end();
    }
  });
});

newsletterEmitter.on("newsletter_signup", (contact) => {
  fs.writeFile("newsletterUsers.csv", JSON.stringify(contact), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`added ${contact} to csv file`);
    }
  });
});

http.createServer().listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});