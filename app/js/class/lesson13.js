{
    //基本定义
    let ajax=function(callback){
        console.log('执行')
        setTimeout(function(){
            callback&&callback.call()
        },1000)
    };
    ajax(function(){
        console.log('timeout1');
    })
}

{
    let ajax=function(){
        console.log('执行2');
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve()
            },1000)
        })
    };
    ajax().then(function(){
        console.log('promise','执行2')
    })
}

{
    let ajax=function(){
        console.log('执行3');
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve();
            },1000)
        })
    }
    ajax().then(function(){
        console.log('中间步骤');
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve();
            }, 2000);
        })
    })
    .then(function(){
        console.log('timeout3');
    })
}

{
    let ajax = function(num){
        console.log('执行4');
        return new Promise(function(resolve,reject){
            if(num>5){
                resolve
            }else{
                throw new Error('出错了')
            }
        })
    }
    ajax(6).then(function(){
        console.log('log',6)
    }).catch(function(err){
        console.log('catch',error)
    });

    ajax(3).then(function(){
        console.log('log',3)
    }).catch(function(err){
        console.log('catch',error)
    });
}

{
    //所有图片都加载完再添加照片
    function loadImg(src){      //src为图片地址
        return new Promise((resolve,reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload=function(){
                resolve(img)
            }
            img.onerror=function(err){
                resolve(err)
            }
        })
    }

    function showImgs(imgs){
        imgs.forEach(function(img){
            document.body.appendChild(img)
        });
    }
    Promise.all([
        loadImg(''),
        loadImg(''),
        loadImg('')
    ]).then(showImgs)
}

{
    //一个图片加载就添加到页面
    function loadImg(src){      //src为图片地址
        return new Promise((resolve,reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload=function(){
                resolve(img)
            }
            img.onerror=function(err){
                resolve(err)
            }
        })
    }
    function showImgs(img){
        let p = document.createElement('p');
        p.appendChild(img)
        document.body.appendChild(p);

    }

    Promise.race([
        loadImg(''),
        loadImg(''),
        loadImg('')
    ]).then(showImgs)
}
