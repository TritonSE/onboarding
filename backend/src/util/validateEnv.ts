import { cleanEnv } from "envalid";
import {port, str} from "envalid/dist/validators";

export default cleanEnv(process.env, {
    PORT: port(),
    MONGODB_URI: str(),
});