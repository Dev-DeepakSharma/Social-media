const mongoose = require("mongoose");

module.exports = async () => {
  const mongoUri =
    "mongodb+srv://rohitchauhan91482_db_user:VqVENTXMdjQbARjw@cluster0.dguqcbz.mongodb.net/myDatabase?retryWrites=true&w=majority";

  try {
    const connect = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
