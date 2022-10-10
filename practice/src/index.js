import * as http from "http";
import { readFile } from "node:fs";

const host = "localhost";
const port = 8000;

let indexFile;
let body;

let users = [
  {
    id: 0,
    username: "litvinka",
    firstName: "Kate",
  },
  {
    id: 1,
    username: "max",
    firstName: "Kate",
  },
];

const requestListener = function (req, res) {
  try {
    let url = req.url;
    if (url.toString().search("users")) {
      userController(req, res);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end("code: 404\n message: 'Resource not found'");
    }
  } catch (e) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify(e));
  }
};

function userController(req, res) {
  const url = req.url;
  const userControllerPath = url.split("/");
  let path = "";
  if (userControllerPath.length === 3) {
    path = userControllerPath.pop();
    if (path === "createWithArray") {
      readData(req, (body) => {
        const parseDataObj = JSON.parse(body);
        users = [...users, ...parseDataObj];
      });
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end("Message: saved");
      return;
    }
    if (path) {
      switch (req.method) {
        case "GET":
          const getUser = users.find((user) => user.username === path);
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end(JSON.stringify(getUser));
          break;
        case "PUT":
          readData(req, (body) => {
            const parseDataObj = JSON.parse(body);
            const indexUser = users.findIndex((user) => user.username === path);
            users[indexUser] = parseDataObj;
          });
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end(JSON.stringify(users));
          break;
        case "DELETE":
          const filtered = users.filter((user) => user.username !== path);
          users = filtered;
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end(JSON.stringify(users));
          break;
        default:
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end("Error");
          break;
      }
      return;
    }
  } else {
    switch (req.method) {
      case "POST":
        readData(req, (body) => {
          users.push(JSON.parse(body));
        });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end("Message: saved");
        break;
      case "GET":
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(users));
        break;
      default:
        res.setHeader("Content-Type", "application/json");
        res.writeHead(400);
        res.end("Error");
        break;
    }
  }
}

function readData(req, func) {
  body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log(body);
      func(body);
    });
}

const server = http.createServer(requestListener);

readFile(process.cwd() + "/src/resource/index.html", "utf8", (err, data) => {
  if (err) {
    console.error(`Could not read index.html file: ${err}`);
    process.exit(1);
    return;
  }
  indexFile = data;
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
});
