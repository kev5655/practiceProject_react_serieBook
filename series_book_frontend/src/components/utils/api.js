import {getJwtToken} from "./jwt";


export async function fetchData(url, methode, body){
    let rawResponse = await fetch(
        url, {
            method: methode,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': "Bearer " + getJwtToken()
            },
            body: body
        });
    if(rawResponse.ok){
        return await rawResponse.json()
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