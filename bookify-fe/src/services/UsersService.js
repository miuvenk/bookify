import NetworkManager from "./NetworkManager/NetworkManager";

import { NetworkRequestType } from "./NetworkManager/network_request_type.enum";
import { NetworkAPI } from "./NetworkManager/network_api.enum";

export default{
    getAllUsers(){
        const method = NetworkRequestType.GET
        const path = NetworkAPI.GET_ALL_USERS
        const dataPromise = NetworkManager.sendRequest(method, path).then((response) => response.data)
        return dataPromise;
    },

    getUserById(params){
        const method = NetworkRequestType.GET
        const path = NetworkAPI.GET_USER_BY_ID
        const urlParams = path + params
        const dataPromise = NetworkManager.sendRequest(method, urlParams).then((response) => response.data)
        return dataPromise;
    },

    createUser(data){
        const method = NetworkRequestType.POST
        const path = NetworkAPI.CREATE_USER
        const dataPromise = NetworkManager.sendRequest(method, path, data).then((response) => response.data)
        return dataPromise;
    },
   
    borrowBook(params) {
        const method = NetworkRequestType.POST;
        const path = NetworkAPI.BORROW_BOOK;
        const urlParams = path
            .replace(':userid', params.userid)
            .replace(':bookid', params.bookid);
        const dataPromise = NetworkManager.sendRequest(method, urlParams).then((response) => response.data);
        return dataPromise;
    },

    returnBook(params,data) {
        const method = NetworkRequestType.POST;
        const path = NetworkAPI.RETURN_BOOK;
        const urlParams = path
            .replace(':userid', params.userid)
            .replace(':bookid', params.bookid);
        const dataPromise = NetworkManager.sendRequest(method, urlParams, data).then((response) => response.data);
        return dataPromise;
    }
}