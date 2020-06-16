function ajax(options) {

	//存储默认值
	var defaults = {
		type: "get",
		url: "",
		data: {},
		header: {
			"Content-Type" : "application/x-www-form-urlencoded"
		},
		success: function(){

		},
		error: function(){

		}
	}

	//使用options对象中的属性覆盖defaults对象中的属性
	Object.assign(defaults, options);

	//创建ajax对象
	var vhr = new XMLHttpRequest();

	//拼接请求参数的变量
	var params = "";

	//循环用户传递进来的对象格式参数
	for(var attr in defaults.data){
		//将参数转换为字符串格式
		params += attr + "=" + defaults.data[attr] + "&"; 
	}

	//将参数最后边的‘&’去掉并且重新赋值给变量params
	params = params.substr(0, params.length -1);

	//判断请求方式
	if(defaults.type == "get"){
		defaults.url = defaults.url + "?" + params;
	}

	//配置ajax对象
	xhr.open(defaults.type, defaults.url);

	//发送请求
	if(defaults.type == "post"){

		//客户端向服务端传递的数据类型
		var contentType = defaults.header["Content-Type"]

		//设置请求参数格式类型
		xhr.setRequestHeader("Content-Type", contentType);

		//判断客户端请求参数格式的类型
		if(contentType == "application/json"){
			xhr.send(JSON.stringify(defaults.data));
		}else {
			xhr.send(params);
		}
	}else {
		xhr.send();

	}
	
	//监听xhr对象下的onload事件
	xhr.onload = function(){

		//获取响应头中的数据
		var contentType = xhr.getResponseHeader('Content-Type');

		//服务器端返回的数据
		var responseText = xhr.responseText

		//判断响应类型中包含application/json
		if(contentType.includes('application/json')){
			responseText = JSON.parse(responseText)
		}

		if(xhr.status == 200){
			defaults.success(xhr.responseText, xhr);
		}else {
			defaults.error(xhr.responseText, xhr);
		}
		
	}
}