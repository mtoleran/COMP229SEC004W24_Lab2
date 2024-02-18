import express from 'express'
import productCtrl from '../controllers/product.controller.js' 

const router = express.Router()

router.route('/api/products').get(productCtrl.list) //get all Products
router.param('productId', productCtrl.productByID) //get Product by id 
router.route('/api/products/:productId').get(productCtrl.read)
router.route('/api/products').post(productCtrl.create) //add new Product
router.route('/api/products/:productId').put(productCtrl.update) // update Product by id 
router.route('/api/products/:productId').delete(productCtrl.removeByID) // remove Product by id 
router.route('/api/products').delete(productCtrl.removeAll) // remove all Products
router.route('/api/products').get(productCtrl.productsNameFilter) // find all Products which contains 'kw'

export default router