/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";

import me from "./me"
import app from "./app"
import auth from "./auth";
import role from "./role";
import user from "./user";
import toast from "./toast";
import action from "./action";
import permission from "./permission"
import changeState from "./changeState";

export default combineReducers({
    me,
    app,
    auth,
    role,
    user,
    toast,
    action,
    permission,
    changeState,
});
