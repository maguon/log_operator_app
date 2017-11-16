import requestHeaders from './RequestHeaders'


function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }).then((response) => response.json())
}

function getCallBack(url, callBack) {
    fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }).then((response) => response.json())
        .then((responseJson) => {
            callBack(null, responseJson)
        })
        .catch((error) => {
            callBack(error, null)
        })
}

function post(url, params) {
    return fetch(url, {
        method: 'POST',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
    // .catch((error) => {
    //     console.log(error)
    // });
}

function postCallBack(url, params, callback) {
    fetch(url, {
        method: 'POST',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null)
        });
}

function put(url, params) {
    return fetch(url, {
        method: 'PUT',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
}

function putCallBack(url, params, callback) {
    return fetch(url, {
        method: 'PUT',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null)
        });
}

function del(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: requestHeaders.headers,
    }).then((response) => response.json())
}

function delCallback(url, callback) {
    fetch(url, {
        method: 'DELETE',
        headers: requestHeaders.headers,
        //body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}



function postFile(url,params ) {
    // console.log(url)
    // console.log(params)
    let formData = new FormData()
    let file = { uri: params.imageUrl, type: params.imageType, name: params.imageName }
    formData.append(params.key, file)
    return fetch(url, {
        method: 'POST',
        headers: requestHeaders.formHeaders,
        body: formData,
    }).then((response) => response.json())
    // .catch((error) => {
    //     console.log(error)
    // });
}


function postFileCallBack(url, params, callback) {
    let formData = new FormData()
    let file = { uri: params.imageUrl, type: params.imageType, name: params.imageName }
    formData.append(params.key, file)
    return fetch(url, {
        method: 'POST',
        headers: requestHeaders.formHeaders,
        body: formData,
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null)
        });
}


module.exports = {
    get: get,
    post: post,
    put: put,
    del: del,
    postFile: postFile,
    getCallBack: getCallBack,
    postCallBack: postCallBack,
    putCallBack: putCallBack,
    postFileCallBack: postFileCallBack,
    delCallback: delCallback
}
