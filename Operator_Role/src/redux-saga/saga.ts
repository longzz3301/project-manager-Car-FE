import { all } from "redux-saga/effects";
import { queryHandleFile, queryUserCollectInfor, queryUserCreate, queryUserForgotPassword, queryUserGetInformation, queryUserLogin, queryUserResetPassword } from "./sagas/user";

export function* rootSaga() {
  yield all([
    queryUserCreate(),
    queryUserLogin(),
    queryUserForgotPassword(),
    queryUserResetPassword(),
    queryUserGetInformation(),
    queryUserCollectInfor(),
    queryHandleFile(),
  ]);
}