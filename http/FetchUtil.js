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

	dofetch(){
		let options         = {};
		options.method      = this.method;
		options.credentials = this.credentials;

		if({} != this.headers){
			options.headers = this.headers;
		}

		if({} != this.bodys && this.method != 'GET'){
			if('form' == this.body_type){
				this.setHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
				let data = '';
				Object.keys(this.bodys).map((index) => {
					let param = encodeURI(this.bodys[index]);
					data += `${index}=${param}&`;
				});
				options.body = data;
			}else if('file' == this.body_type){
				let data = new FormData();
				Object.keys(this.bodys).map((index) => {
					data.append(index, this.bodys[index]);
				});
				options.body = data;
			}else if('json' == this.body_type){
				options.body = JSON.stringify(this.bodys);
			}
		}

		return new Promise([
			fetch(this.url,options),
			new Promise(function (resolve, reject) {
			    setTimeout(() => reject(new Error('request timeout')), this.time)
			})
		]);
	}

}

module.exports = FetchUtil;
