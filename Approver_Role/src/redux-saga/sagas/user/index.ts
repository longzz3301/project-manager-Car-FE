import { METHOD } from "global/enum";
import watchRequest from "utils/saga";
import { QUERY_HANDLE_FILE, USER_CREATE_REQUEST, USER_FORGOT_PASSWORD_REQUEST, USER_GET_INFORMATION_REQUEST, USER_LOGIN_REQUEST, USER_RESET_PASSWORD_REQUEST, USER_SEND_COLLECTION_INFOR_REQUEST } from "../../actions";

export function* queryUserCreate(): Generator {
    return yield watchRequest(USER_CREATE_REQUEST, '/api/v1/user', METHOD.PUT);
}

export function* queryUserLogin(): Generator {
    return yield watchRequest(USER_LOGIN_REQUEST, '/api/v1/user', METHOD.POST);
}

export function* queryUserForgotPassword(): Generator {
    return yield watchRequest(USER_FORGOT_PASSWORD_REQUEST, '/api/v1/user/password', METHOD.GET);
}

export function* queryUserResetPassword(): Generator {
    return yield watchRequest(USER_RESET_PASSWORD_REQUEST, '/api/v1/user/password/$params/$params', METHOD.PUT);
}

export function* queryUserGetInformation(): Generator {
    return yield watchRequest(USER_GET_INFORMATION_REQUEST, '/api/v1/user', METHOD.GET);
}

export function* queryUserCollectInfor(): Generator {
    return yield watchRequest(USER_SEND_COLLECTION_INFOR_REQUEST, '/api/v1/user/request', METHOD.POST);
}

export function* queryHandleFile(): Generator {
    return yield watchRequest(QUERY_HANDLE_FILE, '/api/v1/file', METHOD.POST);
}