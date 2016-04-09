/**
 * Created by wenxucheng on 16/2/29.
    此类为根据平台特定协议扩展FetchUtil
 */

'use strict';

import FetchUtil from './FetchUtil';

class LtFetch extends FetchUtil {

	constructor(baseUrl = '') {
		super();
		this.baseUrl = baseUrl;
 	}

	dofetch() {
        this.url = this._formatUrl(this.url, this.bodys);
		let logBody = '';
		if (this.method != 'GET') {
			logBody = this.bodys;
		}
		console.log(`\n=> fetch:url=${this.url}\n`, logBody ? '\tbody:' : '', logBody ? logBody : '\n');

		this.thenStart(
			(response) => {
				this.checkStatus(response);
				return response;
			}
		);

		return super.dofetch()
			.then((data) => {
				console.log(`\n=> data:`, data, '\n\n');
				return data;
			})
			.catch((err) => {
				if (err.message == 'request timeout') {
					err = -998;
				}
				console.log(`\n=> catch:`, err, '\n\n');
				throw err;
			});
	}

	init() {
		this.isCheckStatus = true;
		super.init();
		return this;
	}

	checkStatus(response){
		console.log("response.headers.map = ", response.headers.map);
		if (this.isCheckStatus && response.headers.map['api-status'] != 1) {
			console.log("response.headers.map['api-status'] = ", response.headers.map['api-status']);
			throw parseInt(response.headers.map['api-status']);
		}
	}

	setCheckStatus(isCheckStatus) {
		this.isCheckStatus = isCheckStatus;
		return this;
	}

	//如果api中带有{}携带参数格式化
    _formatUrl(url, params) {
        if (url.includes('{') && !!params) {
			let names = Object.keys(params);
        	for (let i = names.length-1; i >= 0 ; i--) {
				let name = names[i];
        		if (url.includes(name)) {
        			url = url.replace('{'+name+'}', params[name]);
        		}
        	}
        }
		return url.startsWith('http://') ? url : this.baseUrl + url;
    }

}

module.exports = LtFetch;
