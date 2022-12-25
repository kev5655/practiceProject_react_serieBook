import {ConnectionRefusedError, TokenError, UnauthorizedError} from "./Error";

const serverUrl = 'http://192.168.1.138:8081'
export const api = () => {
    const sendRequestFN = async (requestConfig, resolveData, error) => {
        if (requestConfig.headers['Content-Type'] === 'application/json') {
            requestConfig.body = JSON.stringify(requestConfig.body)
        }
        try {
            const response = await fetch(serverUrl + requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? requestConfig.body : null,
            });

            if (!response.ok) {
                throw new Error('Request failed! ' + response.status);
            }

            const data = await response.json();
            if (data.error_message) {
                alert("Backend has an error: ", data.error_message)
                if(TokenError.backendErrors.find(error => data.error_message.match(error))){
                    throw new TokenError(data.error_message);
                }
                if(UnauthorizedError.backendErrors.find(error => data.error_message.match(error))){
                    throw new UnauthorizedError(data.error_message);
                }
                alert("Another error in api.js: ", data.error_message);
            }

            resolveData(data);
        } catch (err) {
            if(ConnectionRefusedError.backendErrors.find(error => err.message.match(error))){
                return error(new ConnectionRefusedError(err.message))
            }
            error(err);
        }
    };

    return {
        sendRequestFN
    };
};


export function convert_JSObject_To_x_www_form_urlencoded(data) {
    let formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}
