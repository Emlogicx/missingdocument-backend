var seeder = require("mongoose-seed");
const uri = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost:27017/UserDatabase";

// Data array containing seed data - documents organized by Model
var data = [
  {
    model: "Admin",
    documents: [
      {
        email: "missingdocument@gmail.com",
        password: "missingDocument123",
        name: "Admin",
      },
      {
        email: "bangsir@gmail.com",
        password: "missingDocument123",
        name: "Admin",
      },
    ],
  },
];

// Connect to MongoDB via Mongoose
seeder.connect(uri, function () {
  // Load Mongoose models
  seeder.loadModels(["model/admin_model.js"]);

  // Clear specified collections
  seeder.clearModels(["Admin"], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});
