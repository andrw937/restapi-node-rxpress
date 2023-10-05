import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
const app = express();


app.use(bodyParser.json());
const readData = () => {
  try {
    const data = fs.readFileSync("./bd.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};


const writeData = () => {
  try {
    fs.writeFileSync("./bd.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};


app.get("/", (req, res) => {
  res.send("Welcome to API whits nodejs!");
});

app.get("/usuarios", (req, res) => {
  const data = readData();
  res.json(data.users);
});

app.get("/usuarios/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const user = data.users.find(user => user.id === id);
  res.json(user);
});

app.post('/usuarios', (req, res) => {
    const data = readData();
    const body = req.body;
    const newUser ={
        id: data.users.length + 1,
        ...body
    }
    data.users.push(newUser);
    writeData(data)
    res.json(newUser);
});

app.put('/usuarios/:id', (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id)
    const userIndex = data.users.findIndex((user) => user.id === id)
    data.users[userIndex]={
        ...data.users[userIndex],
        ...body,
    };
    writeData(data);
    res.json({message: 'user updated successfully'})
});


app.delete('/usuarios/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id)
    const userIndex = data.users.findIndex((user) => user.id === id)
    data.users.splice(userIndex, 1)
    writeData(data)
    res.json({message: 'user deleted successfully'})
});


app.listen(3000, () => {
  console.log("Servidor ON en el puerto 3000");
});
