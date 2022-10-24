import {getJwtToken} from "./jwt";

//ToDo wen kein contentType standard wählen json

// 'application/x-www-form-urlencoded;charset=UTF-8'
export async function fetchData(url, methode, body, contentType) {
    let rawResponse = await fetch(
        "" + url, { //http://192.168.1.138:8081 http://localhost:8081
            method: methode,
            headers: {
                'Content-Type': contentType,
                'Authorization': "Bearer " + getJwtToken()
            },
            body: body
        });
    if (rawResponse.ok) {
        try {
            return await rawResponse.json()
        } catch (exception) {
            return null;
        }
    } else {
        let response = await rawResponse.json();
        console.log(response.status);
        if(rawResponse.status === 401){
            return 401;
        }
    }
    throw new Error("Failed Fetch Data from Url: " + url + " / " + methode + " / " + body);
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