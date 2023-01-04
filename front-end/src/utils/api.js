import {ConnectionRefusedError, TokenError, UnauthorizedError} from "./Error";

const serverUrl = ''; //http://192.168.1.138:8081
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
                switch (response.status) {
                    case 401:
                        console.log("Login Failed");
                        throw new Error("Login Failed");
                    case 404:
                        console.log("Server is not reachable");
                        alert("Server is not reachable");
                        throw new Error("Server is not reachable");
                    default:
                        console.log("Unknown error");
                        alert("Unknown error");
                        throw new Error("Unknown error");
                }
            }

            const data = await response.json();
            if (data.error_message) {
                alert("Backend has an error: ", data.error_message)
                if (TokenError.backendErrors.find(error => data.error_message.match(error))) {
                    throw new TokenError(data.error_message);
                }
            }

            resolveData(data);
        } catch (err) {
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
