const express = require("express");
const usersData = require("./users/model.js");
const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res.status(400).json({ message: "Lütfen isim ve bio giriniz" });
    } else {
      const user = await usersData.insert(req.body);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcı Eklenemedi",
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await usersData.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcı Bilgileri Alınamadı",
    });
  }
});

server.get("api/users/:id", async (req, res) => {
  try {
    const user = await usersData.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Kullanıcı bilgileri alınamadı" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcı Bilgileri Alınamadı",
    });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await usersData.remove(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({
        message: "Kullanıcı silinemedi",
    });
  }
});


server.put("/api/users/:id", async (req, res) => {
    try {
        const user = await usersData.update(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Kullanıcı güncellenemedi",
        });
    }
});




module.exports = server;
