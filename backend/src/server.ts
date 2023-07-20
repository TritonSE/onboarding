import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT;
const MONGODB_URI = env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Mongoose connected!");
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}.`);
        });
    })
    .catch(console.error);