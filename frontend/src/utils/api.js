
const BACKEND_ERRORS = {
    USER_AVAILABLE: "401 UNAUTHORIZED",
    TOKEN_EXPIRED: 'The Token has expired on'
}

export class TokenError extends Error {
    static backendTokenError = [BACKEND_ERRORS.TOKEN_EXPIRED]
    constructor(message) {
        super(message);
        this.name = "TokenError";
    }
}

export class SingUpError extends Error {
    static backendTokenError = [BACKEND_ERRORS.USER_AVAILABLE]
    constructor(message) {
        super(message);
        this.name = "SingUpError"
    }
}
export const api = () => {
    const sendRequestFN = async (requestConfig, resolveData, error) => {
        if (requestConfig.headers['Content-Type'] === 'application/json') {
            requestConfig.body = JSON.stringify(requestConfig.body)
        }
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? requestConfig.body : null,
            });

            if (!response.ok) {
                throw new Error('Request failed! ' + response.status);
            }

            const data = await response.json();
            if (data.error_message) {
                if(TokenError.backendTokenError.find(error => data.error_message.match(error))){
                    throw new TokenError(data.error_message);
                }
                if(SingUpError.backendTokenError.find(error => data.error_message.match(error))){
                    throw new SingUpError(data.error_message);
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
