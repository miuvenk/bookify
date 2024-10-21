import NetworkManager from "./NetworkManager/NetworkManager";

import { NetworkRequestType } from "./NetworkManager/network_request_type.enum";
import { NetworkAPI } from "./NetworkManager/network_api.enum";

export default{
    getAllBooks(){
        const method = NetworkRequestType.GET
        const path = NetworkAPI.GET_ALL_BOOKS
        const dataPromise = NetworkManager.sendRequest(method,path).then((response) => response.data)
        return dataPromise;
    },

    getBookById(params){
        const method = NetworkRequestType.GET
        const path = NetworkAPI.GET_BOOK_BY_ID
        const urlParams = path + params
        const dataPromise = NetworkManager.sendRequest(method, urlParams).then((response) => response.data)
        return dataPromise;
    },

    createBook(data){
        const method = NetworkRequestType.POST
        const path = NetworkAPI.CREATE_BOOK
        const dataPromise = NetworkManager.sendRequest(method, path, data).then((response) => response.data)
        return dataPromise;
    },
}