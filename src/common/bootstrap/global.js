/**
 *	公用函数方法
 *
 */

/**
 * [获取数据]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
global.fetch = (options) => {
	let HttpsService = think.service("api");
	let httpsInstance = new HttpsService();
	let promise = new Promise((resolve, reject) => {
		if (think.isEmpty(options.url)) {
			let error = {
				code: 1000,
				msg: "URL is required",
			}
			reject(error);
		}
		let stime = new Date().valueOf();
		if (think.isEmpty(options.data)) {
			options.data = {};
		}
		httpsInstance
			.ServiceHandler(options.url, options.data)
			.then(respones => {
				let etime = new Date().valueOf();
				console.log("===================", new Date(), "=====================");
				console.log("[" + new Date() + "]", "服务器请求开始时间: ", stime);
				console.log("[" + new Date() + "]", "服务器接口请求地址: ", options.url);
				if (think.isEmpty(options.data)) {
					console.log("[" + new Date() + "]", "服务器接口请求类型： ", "GET");
				} else {
					console.log("[" + new Date() + "]", "服务器接口请求类型： ", "POST");
					console.log("[" + new Date() + "]", "服务器接口请求参数: ");
					console.log(options.data);
				}
				if (parseInt(respones.statusCode) !== 200) {
					let error = {
						code: respones.statusCode,
						msg: respones.statusMessage,
					}
					console.log("[" + new Date() + "]", "服务器接口异常：", respones.statusCode + "||" + respones.statusMessage);
					console.log("[" + new Date() + "]", "服务器接口请求结束时间: ", etime);
					console.log("[" + new Date() + "]", "服务器接口请求耗时：", etime - stime, "ms");
					console.log("[" + new Date() + "]", "服务器接口返回数据: ");
					console.log(error);
					reject(error);
				} else {
					try {
						let data = JSON.parse(respones.body);
						if (data.code === 0) {
							data.code = 0;
							console.log("[" + new Date() + "]", "服务器接口数据正常：", "Successful");
							console.log("[" + new Date() + "]", "服务器接口请求结束时间: ", etime);
							console.log("[" + new Date() + "]", "服务器接口请求耗时：", etime - stime, "ms");
							console.log("[" + new Date() + "]", "服务器接口返回数据: ");
							console.log(data);
							resolve(data);
						} else {
							data.code = 1000;
							console.log("[" + new Date() + "]", "服务器接口数据异常：", "Error返回值告警", data.status);
							console.log("[" + new Date() + "]", "服务器接口请求结束时间: ", etime);
							console.log("[" + new Date() + "]", "服务器接口请求耗时：", etime - stime, "ms");
							console.log("[" + new Date() + "]", "服务器接口返回数据: ");
							console.log(data);
							reject(data);
						}
					} catch (err) {
						let error = {
							code: 1000,
							msg: "JSON Parsing Error"
						}
						console.log("[" + new Date() + "]", "服务器接口数据异常：", "JSON Parsing Error", err);
						console.log("[" + new Date() + "]", "服务器接口请求结束时间: ", etime);
						console.log("[" + new Date() + "]", "服务器接口请求耗时：", etime - stime, "ms");
						console.log("[" + new Date() + "]", "服务器接口返回数据: ");
						console.log(respones.body);
						reject(error);
					}
				}
				console.log("============================================================================================");
			})
	})
	return promise;
}



/**
 * [获取设备平台]
 * @return {[int]} [返回设备平台代号]
 * [1:Android,2: IOS,3:PC,4:微信,5:未知,8:Android-微信,9:IOS-微信]
 */
global.getPlatForm = (ua) => {
	let _userAgent = ua.toLowerCase();
	if ((/mobile/i.test(_userAgent)) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(_userAgent))) {
		if (/iphone/i.test(_userAgent)) {
			if (/micromessenger/i.test(_userAgent)) {
				return 8;
			} else {
				return 2;
			}
		} else if (/android/i.test(_userAgent)) {
			if (/micromessenger/i.test(_userAgent)) {
				return 9;
			} else {
				return 1;
			}
		} else {
			return 5;
		}
	} else {
		return 3;
	}

}


/**
 * [获取系统]
 * @return {[int]} [返回系统平台代号]
 * [1:Andriod,2: IOS,3:PC,5:未知]
 */
global.getSystemOS = (ua) => {
	let _userAgent = ua.toLowerCase();
	if ((/mobile/i.test(_userAgent)) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(_userAgent))) {
		if (/iphone/i.test(_userAgent)) {
			return 2;
		} else if (/android/i.test(_userAgent)) {
			return 1;
		} else {
			return 5;
		}
	} else {
		return 3;
	}
}