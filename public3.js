(function (){
    var $={};
    //ajax
    /*
     url  接口地址
     type 请求的方
     data  你要发送的数据
     contentType 数据编码
     dataType  返回来的数据类型
     success:function(data)   成功
     complete                   完成
     */
    function ajax(parma){
     if(parma && typeof parma =='object'){



     //   1.创建ajax对象
         var xmlHttp=new XMLHttpRequest();

         xmlHttp.onloadend=function (){
             if(parma.completed){
                 parma.completed()
             }
         }
     //   2.判断请求的方法
         if(parma.type=='get'){
             if(parma.data){
                 xmlHttp.open('get',parma.url+'?'+parma.data)
             }else {
                 xmlHttp.open('get',parma.url)
             }
         }else {
             xmlHttp.open('post',parma.url)
         }
     //    3.设置数据编码
         if(parma.data && parma.contentType!='fromData'){
             if(parma.contentType=='json'){
                 xmlHttp.setRequestHeader('Content-type','application/json')
             }else {
                xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded')
             }
         }
     //    4.设置返回来的数据
         xmlHttp.onreadystatechange=function (){
             if(xmlHttp.status==200 && xmlHttp.readyState==4){
                if(parma.dataType=='json'){
                    var data=JSON.parse(xmlHttp.responseText)
                }else {
                    var data=xmlHttp.responseText
                }
                parma.success(data)
             }
         }
     //    5.发送请求
         if(parma.type=='post'){
             xmlHttp.send(parma.data)
         }else{
             xmlHttp.send();
         }
     }else {
         alert('参数不是对象类型')
     }

    }
    $.ajax=ajax;
    window.$=$;
//
})()