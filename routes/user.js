const router = require('express').Router()
const User = require('../models/user')
const alert = require('alert')



//登入
router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.post('/login', (req, res) => {
    let { email, password } = req.body

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                alert('Your Incorrect information entered')
                res.redirect('/user/login')
            }
            else {
                if (password === user.password) {
                    req.session.userinfo = user
                    res.redirect('/product')
                }
                else {
                    alert('Your Incorrect information entered')
                    res.redirect('/user/login')
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })

})

// 登出
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/user/login')
        }
    })

})





module.exports = router
