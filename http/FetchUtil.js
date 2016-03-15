/**
 * Created by wenxucheng@163.com on 16/3/10.
 */

'use strict';

class FetchUtil {
	constructor(baseUrl = null) {
		if(null === baseUrl){
			this.baseUrl = '';
		}else{
			this.baseUrl = baseUrl;
		}
 	}

	init(){
		this.url           = '';
		this.method        = 'GET';
		this.headers       = {};
		this.body_type     = 'form';
		this.bodys         = {};
		this.credentials   = 'omit';
		this.return_type   = 'json';
		this.time          = 0;
		this.timer         = null;
		this.timer_done    = false;
		this.timeout_event = ()=>{console.log('the http request timeout')};

		return this;
	}


	setUrl(url){
		this.url = url.startsWith('http://') ? url : this.baseUrl + url;
		return this;
	}

	setMethod(val){
		this.method = val;
		return this;
	}

	setBodyType(val){
		this.body_type = val;
		return this;
	}

	setReturnType(val){
		this.return_type = val;
		return this;
	}

	setTime(val){
		this.time = val;
		return this;
	}

	setTimeoutEvent(val){
		this.timeout_event = val;
		return this;
	}

	setHeader(name, val=null){
		if(typeof name == 'string'){
			this.headers[name] = val;
		}else if(typeof name == 'object'){
			Object.keys(name).map((index)=>{
				this.headers[index] = name[index];
			});
		}

		return this;
	}

	setBody(name, val=null){
		if(typeof name == 'string'){
			this.bodys[name] = val;
		}else if(typeof name == 'object'){
			Object.keys(name).map((index)=>{
				this.bodys[index] = name[index];
			});
		}
		return this;
	}

	setCookieOrigin(){
		this.credentials = 'same-origin';
		return this;
	}

	setCookieCors(){
		this.credentials = 'include';
		return this;
	}

	timeout(){
		this.timer_done = true;
		this.timeout_event();
	}

	dofetch(){
		let options         = {};
		options.method      = this.method;
		options.credentials = this.credentials;

		if({} != this.headers){
			options.headers = this.headers;
		}

		this.url = _formatUrl(this.url, this.bodys);

		if({} != this.bodys && this.method != 'GET'){
			if('form' == this.body_type){
				this.setHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
				let data = '';
				Object.keys(this.bodys).map((index)=>{
					let param = encodeURI(this.bodys[index]);
					data += `${index}=${param}&`;
				});
				options.body = data;
			}else if('file' == this.body_type){
				let data = new FormData();
				Object.keys(this.bodys).map((index)=>{
					data.append(index, this.bodys[index]);
				});
				options.body = data;
			}else if('json' == this.body_type){
				options.body = JSON.stringify(this.bodys);
			}
		}

		if(this.time){
			this.timer = setTimeout(()=>{
				this.timeout();
			},this.time);
		}

		return fetch(this.url,options).then(
			(response)=>{
				this.clearTimeoutCheck();
				this.checkStatus(response);
				return response;
			}
		).then(
			(response)=>{
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
		).catch(
			(err)=>{
				this.clearTimeoutCheck(err);
				throw err;
			}
		);
	}

	checkStatus(response){
		console.log(response);
		//throw new Error('no login');
	}

	clearTimeoutCheck(err = null){
		if(this.timer != null){
			clearTimeout(this.timer);
		}
		//防止正常超时返回的数据
		if(this.timer_done == true){
			throw new Error('timeout');
		}
	}

	//如果api中带有{}携带参数格式化
    _formatUrl(url, params) {
        if (url.includes('{') && !!params) {
        	for (let i = params.keys().length-1; i >= 0 ; i--) {
				let name = params.keys()[i];
        		if (url.includes(name)) {
        			url = url.replace('{'+name+'}', params[name]);
        		}
        	}
        }
		return url;
    }
}

module.exports = FetchUtil;
