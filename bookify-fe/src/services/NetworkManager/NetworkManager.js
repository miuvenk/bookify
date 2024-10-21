import axios from 'axios';
import { NetworkRequestType } from './network_request_type.enum';

const API_URL = 'http://localhost:3000'

export default{

    getHeaders(){
        return{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    },

    sendRequest(method, path, data){
        let response = null;
        let headers = null;

        headers = this.getHeaders();

        switch (method) {
            case NetworkRequestType.POST:
                response = this.sendPostRequest(path, data, headers)
                break;
        
            case NetworkRequestType.GET:
                response = this.sendGetRequest(path, headers)
                break;
            
            case NetworkRequestType.PUT:
                response = this.sendPutRequest(path, data, headers)
                break;
            
            case NetworkRequestType.DELETE:
                response = this.sendDeleteRequest(path, data, headers)
                break;
        
            default:
                break;
        }

        return response;
    },

    async sendGetRequest(path, headers){
        const response = await axios.get(API_URL + path, {headers:headers})
        return response;
    },

    async sendPostRequest(path, data, headers){
        const response = await axios.post(API_URL + path, data, {headers:headers})
        return response;
    },

    async sendPutRequest(path, data, headers){
        const response = await axios.get(API_URL + path, data, {headers:headers})
        return response;
    },
    async sendDeleteRequest(path, data, headers){
        const response = await axios.get(API_URL + path, {headers:headers, data: data})
        return response;
    }

}