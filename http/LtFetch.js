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

		return super.dofetch()
            .then(
    			(response) => {
					console.log(`\n=> response:\n\turl=${response.url}`, '\n\theaders:', response['headers'], '\n\tbody:', response['_bodyText'], '\n\n');
    				this.checkStatus(response);
    				return response;
    			}
    		)
    		.then(
    			(response) => {
    				if('json' == this.return_type){
    					return response.json();
    				}else if('text' == this.return_type){
    					return response.text();
    				}else if('blob' == this.return_type){
    					return response.blob();
    				}else if('formData' == this.return_type){
    					return response.formData();
    				}else if('arrayBuffer' == this.return_type){
    					return response.arrayBuffer();
    				}
    			}
    		)
    		.catch(
    			(err) => {
    				throw err;
    			}
    		);
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
