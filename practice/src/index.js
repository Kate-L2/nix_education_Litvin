import * as http from "http";
import { readFile } from "node:fs";

const host = "localhost";
const port = 8000;

let indexFile;
let body;

const users = [];

const requestListener = function (req, res) {
  try {
    switch (req.url) {
      case "/users":
        userController(req, res);
        break;
      case "/users/createWithArray":
        userController(req, res);
        break;
      case "/users/{userName}":
        userController(req, res);
        break;
      case "/":
        res.end(indexFile);
        break;
      default:
        res.setHeader("Content-Type", "application/json");
        res.writeHead(404);
        res.end(`{code: 404, message: "Resource not found"}`);
    }
  } catch (e) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify(e));
  }
};

function userController(req, res) {
  switch (req.method) {
    case "POST":
      postFunc(req, (body) => {
        users.push(body);
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
    case "PUT":
      putFunc(req);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(users));
      break;
    case "DELETE":
      if (deleteFunc(req)) {
        res.writeHead(200);
        res.end("User was deleted");
      } else {
        res.writeHead(400);
        res.end("There is no user with such name");
      }
      break;
    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end("Error");
      break;
  }
}

function postFunc(req, func) {
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

function deleteFunc(req) {
  const { name } = req.param;
  const deleted = users.find((user) => user.name === name);

  if (deleted) {
    users = users.filter((el) => el.name !== param);
    return users;
  } else {
    return false;
  }
}

function putFunc(req) {
  const userName = req.params.userName;
  if (data.length > 0) {
    const user = data.find((u) => u.userName === userName);
    if (typeof user === "undefined") {
      res.status(404).send({
        error: "User not found",
      });
    } else {
      res.status(200).send(user);
    }
  }
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
