import { takeLatest } from "redux-saga/effects";
import { METHOD } from "global/enum";
import { Action } from "global/interface";
import store from "../redux-saga/store";
import actionRequest from "./restApi";

function doRequest(uri: string, method: METHOD, request: Action) {
    actionRequest(uri, method, request).then(response => {
        if (typeof response.data === 'object' && response.status) {
            store.dispatch({
                type: request.payload?.success as string,
                response: response.data,
                componentId: request.componentId,
                success: response.data.status,
                payload: {
                    query: request.payload?.query
                }
            })
        } else {
            store.dispatch({
                type: request.payload?.failed as string,
                response: null,
                componentId: request.componentId,
                success: response.data.status,
                payload: {
                    query: request.payload?.query
                }
            })
        }
    });
}
function* watchRequest(pattern: string, uri: string, method: METHOD): Generator {
    yield takeLatest(pattern, doRequest, uri, method);
}
export default watchRequest;