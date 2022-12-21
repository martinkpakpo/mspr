import express from "express";
import bodyParser from "body-parser";

import erpRoutes from "./routes/routeErp.js";
import securityRoutes from "./routes/routeSecurity.js";
import crmRoutes from "./routes/routeCrm.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/api/revendeur/erp", erpRoutes);
app.use("/api/webshop/erp", erpRoutes);
app.use("/api/webshop/crm", crmRoutes);

app.use("/security", securityRoutes);
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));