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

		console.log(`\n=> fetch:url=${this.url}\n\n`);
		let headers = undefined;

		this.thenStart(
			(response) => {
				// console.log(`\n=> response:\n\turl=${response.url}`, '\n\theaders:', response['headers'], '\n\tbody:', response['_bodyInit'].toString(), '\n\n');
				this.checkStatus(response);
				return response;
			}
		);

		return super.dofetch()
		.then((data) => {
			console.log(`\n=> response:\n\turl=${this.url}`,
				'\n\tdata:', data, '\n\n');
			return data;
		})
		.catch((err) => {
			if (err.message == 'request timeout') {
				throw 998;
			}
		});
	}

	init() {
		this.isCheckStatus = true;
		super.init();
		return this;
	}

	checkStatus(response){
		if (this.isCheckStatus && response.headers.map['api-status'] != 1) {
			throw response.headers.map['api-status'];
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
