import { combineReducers } from "redux";
import { UserCollectionInfor, UserCreate, UserForgotPassword, UserLogin, UserResetPassword } from "./reducers/user";
const rootReducer = combineReducers({
    userCreate: UserCreate,
    userLogin: UserLogin,
    userForgotPassword: UserForgotPassword,
    userResetPassword: UserResetPassword,
    userCollectionInfor: UserCollectionInfor,
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;