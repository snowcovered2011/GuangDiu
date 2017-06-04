/**
 * Created by jmxb on 2017/4/4.
 * 开心每一天
 */

export default class FetchData {
    constructor(props) {}
        /**
         *  get请求
         *  url:请求地址
         *  params:参数
         *  headers:请求头
         * */
    static getData(url, params, headers) {
            if (params) {
                let paramsArray = [];
                //拼接参数(es6语法)
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
            return new Promise((resolve, reject) => {
                fetch(url, {
                        method: 'GET',
                        headers: headers
                    })
                    .then((response) => response.json())
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject({ status: -1 })
                    })
                    .done();
            })
        }
        /**
         *  post请求
         *  url:请求地址
         *  params:参数
         *  headers:请求头
         * */
    static postData(url, params, headers) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(params),
                })
                .then((response) => response.json())
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject({ status: -1 })
                })
                .done();
        })
    }


}