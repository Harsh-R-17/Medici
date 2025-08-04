const express = require("express");
const { default: Book, initModels } = require("medici");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Business Configuration
const BUSINESS_CONFIG = {
  MEDANTA_BUSINESS_ID: "b-165935897059530",
  BUSINESS_NAME: "Medanta",
  SYSTEM_NAME: "Medici Credit System"
};

app.use(express.json());

const useMemoryReplSet = process.env.USE_MEMORY_REPL_SET === "true";

console.log("USE_MEMORY_REPL_SET:", useMemoryReplSet);

async function startMongo() {
  const connection = await mongoose.connect(
    "mongodb://172.31.5.177:27017/?readPreference=primary&directConnection=true&ssl=false&authMechanism=DEFAULT",
    {
      bufferCommands: false,
      noDelay: true,
    }
  );
  const db = connection.connection.db;
  //   try {
  //     await initModels();
  //   } catch (err) {
  //     console.log(err);
  //   }
  console.log(await db.admin().listDatabases());
}

startMongo();

app.get("/", async (req, res) => {
  try {
    const myBook = new Book("MyBook");
    const journal = await myBook
      .entry("Received payment")
      .debit("Assets:Cash", 1000)
      .credit("Income", 1000, { 
        client: "Joe Blow",
        businessId: BUSINESS_CONFIG.MEDANTA_BUSINESS_ID,
        businessName: BUSINESS_CONFIG.BUSINESS_NAME
      })
      .commit();
    console.log(journal);
    res.status(200).json({ 
      status: "success",
      businessId: BUSINESS_CONFIG.MEDANTA_BUSINESS_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.get("/business-info", (req, res) => {
  res.status(200).json({
    businessId: BUSINESS_CONFIG.MEDANTA_BUSINESS_ID,
    businessName: BUSINESS_CONFIG.BUSINESS_NAME,
    systemName: BUSINESS_CONFIG.SYSTEM_NAME,
    status: "active"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Business ID: ${BUSINESS_CONFIG.MEDANTA_BUSINESS_ID}`);
});
