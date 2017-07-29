class Odakyu {
    constructor() {}

    getStatus(callback) {
        return this.apiCall("service/status").then((json) => {
            if(json == null) {
                return null;
            }
            if (Array.isArray(json.status) && json.status.length > 0) {
                callback(json.status[0].message)
            } else {
                callback(null)
            }
        });
    }
    trains(callback) {
        return this.apiCall("trains").then((json) => { callback(json.trains) });
    }

    getStops(trainCode, updown) {
        var api = "trains/" + trainCode + "/stops?up_down=" + updown + "&time=1"
        return this.apiCall(api).then((json) => { return json.stops; });
    }

    apiCall(api) {
        return fetch("https://69li80j046.execute-api.ap-northeast-1.amazonaws.com/prod/v1/" + api, {
            method: 'GET',
            headers: {
                'x-api-key': 'KsoE5Xo4MD2sPxxPlBmIY1QPbdR3NLVs3C8Fw3Ih',
                mode: 'cors'
            }
        }).then((response) => {
            return response.json();
        }).catch((error) => {
            return null;
        })
    }
}