
export const api = () => {
    const sendRequestFN = async (requestConfig, resolveData, error) => {
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
            if(data.error_message){
                throw new TokenError(data.error_message)
            }
            resolveData(data);
        } catch (err) {
            error(err)
        }
    };

    return {
        sendRequestFN
    };
};

export class TokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "TokenError";
    }
}
export function convertJsonTo_x_www_form_urlencoded(data) {
    let formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}
