const express = require("express");
const cors = require("cors");
const path = require('path');
const authRoutes = require("./routes/auth");
const mascotasRoutes = require("./routes/mascotas");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando 🔥");
});

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", authRoutes);
app.use("/api/admin", require("./routes/admin"));

app.use("/api/mascotas", mascotasRoutes);