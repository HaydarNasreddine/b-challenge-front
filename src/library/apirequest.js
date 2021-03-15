import ls from 'local-storage';

export default function apirequest(endpoint, { body, fCall, sCall, token = true, params }) {
    var lastStatus = 0;
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (token) {
        headers.Authorization = 'Bearer ' + ls.get('token')
    }
    fetch(endpoint.api + (params != undefined ? params : ''), {
        method: endpoint.method,
        headers: headers,
        cache: "no-cache",
        body: JSON.stringify(body)
    })
        .then(res => { lastStatus = res.status; return res.json() })
        .then(
            (result) => {
                if (lastStatus == 200 || lastStatus == 201) {
                    if (sCall != undefined) sCall(result);
                }
                else if (fCall != undefined) fCall(result);

                if (lastStatus === 401 && fCall == undefined) {
                    window.location.href = "/";
                }
            },
            (error) => {
                if (fCall != undefined) fCall(error);
            }
        )
}