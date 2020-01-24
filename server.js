const express = require("express");
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function(){ 
    console.log('Listening on on : http://localhost:' + PORT)
});