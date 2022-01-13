const router = require('express').Router()
const Product = require('../models/product')
const multiparty = require('multiparty');
const alert = require('alert')


//取得商品
router.get('/', (req, res) => {

    Product.find({})
        .then((data) => {
            res.render('product.ejs', { data })
        })
        .catch((err) => {
            res.send(err)
        })

})

//新增商品
router.get('/add', (req, res) => {
    res.render('productAdd.ejs')
})

router.post('/add', (req, res) => {



    const form = new multiparty.Form({
        uploadDir: 'public/images/'
    });

    form.parse(req, function (err, fields, files) {

        if (err) {
            console.log(err)
        }
        else {
            let title = fields.title[0]
            let introduc = fields.introduc[0]
            let price = fields.price[0]
            let picUrl = files.pic[0].path
            let pic = picUrl.slice(6)


            const newProduct = new Product({
                title, introduc, price, pic
            })

            newProduct.save()
                .then((data) => {
                    res.redirect('/product')
                })
                .catch((err) => {
                    console.log(err.message)
                    alert('資料輸入錯誤，請從新輸入')
                    res.redirect('./add')
                })
        }



    });

})

//修改商品
router.get('/edit/:_id', (req, res) => {
    let { _id } = req.params

    Product.findOne({ _id })
        .then((data) => {
            res.render('productEdit.ejs', { data })
        })
        .catch((err) => {
            console.log(err)
        })

})
router.post('/edit/:_id', (req, res) => {
    let { _id } = req.params
    console.log(_id)

    let { title, introduc, price } = req.body

    Product.findOneAndUpdate({ _id }, { title, introduc, price })
        .then(() => {
            res.redirect('/product')
        })
        .catch((err) => {
            console.log(err)
        })
})

//刪除商品
router.get('/delete/:_id', (req, res) => {
    let { _id } = req.params
    Product.findOneAndDelete({ _id })
        .then(() => {
            res.redirect('/product')
        })
        .catch((err) => {
            console.log(err)
        })

})




module.exports = router




