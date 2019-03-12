const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login',(req,res,next) => {
    axios.post(`${baseUrl}/accesstoken`)
        .then(resp => {
            if (resp.status === 200 && resp.data.success){
                req.session.user = {
                    accessToken: req.body.accessToken,
                    loginName: resp.data.loginname,
                    id: resp.data.id,
                    avatarUrl: resp.data.avatar_url
                }
                res.json({
                    success:true,
                    data:resp.data
                })
            }
        })
        .catch(e => {
            if (e.response){
                res.json({
                    success:false,
                    data:e.response
                })
            }else {
                next(e)
            }
        })
})

module.exports = router