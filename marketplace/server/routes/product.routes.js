import express from 'express'
import productCtrl from '../controllers/product.controller.js' 

const router = express.Router()

router.route('/api/products').get(productCtrl.list) //get all Products, find all Products which contains 'kw'
router.param('productId', productCtrl.productByID) //get Product by id 
router.route('/api/products/:productId').get(productCtrl.read)
router.route('/api/products').post(productCtrl.create) //add new Product
router.route('/api/products/:productId').put(productCtrl.update) // update Product by id 
router.route('/api/products/:productId').delete(productCtrl.removeByID) // remove Product by id 
router.route('/api/products').delete(productCtrl.removeAll) // remove all Products

export default router