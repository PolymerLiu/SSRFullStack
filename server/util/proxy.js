const axios = require('axios')
const querystring = require('querystring')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req,res,next) {
    const path = req.path
    const user = req.session.user || {}
    const needAccessToken = req.query.needAccessToken

    // console.log('==============',user);
    if (needAccessToken && user.accessToken){
        res.status(401).send({
            success:false,
            msg: 'need login'
        })
    }

    //不能直接发送我们的参数，因为其有我们自定义的参数
    const query = Object.assign({},req.query)
    if (query.needAccessToken){
        delete query.needAccessToken
    }

    axios(`${baseUrl}${path}`,{
        method: req.method,
        params: query,
        data: querystring.stringify(Object.assign({},req.body,{
            accesstoken: user.accessToken
        })),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(resp => {
        if (resp.status === 200){
            res.send(resp.data)
        }else{
            res.status(resp.status).send(resp.data)
        }
    }).catch(e => {
        if (e.response){
            res.status(500).send(e.response.data)
        }else{
            res.status(500).send({
                success:false,
                msg:'未知错误'
            })
        }
    })
}

