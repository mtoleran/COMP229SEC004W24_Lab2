import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const read = (req, res) => {
    return res.json(req.profile) 
}

const list = async (req, res) => { 
    let products = await Product.find().select('name description price quantity category') 
    try {
        if(Object.keys(req.query).length !== 0){
            products = await Product.find({ name: { $regex: req.query.name, $options: 'i' } }).select('name description price quantity category')
        }
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    }    
}

const productByID = async (req, res, next, id) => {
    try {
        let product = await Product.findById(id)
        if (!product)
            return res.status(400).json({ 
                error: "Product not found"
            })
        req.profile = product
        next()
    } catch (err) {
        return res.status(400).json({ 
            error: "Could not retrieve product"
        }) 
    }
}

const create = async (req, res) => {
    const product = new Product(req.body) 

    try {
        await product.save()
        return res.status(200).json({ 
            message: "Product added successfully!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const update = async (req, res) => {
    try {
        let product = req.profile
        product = extend(product, req.body) 
        await product.save()

        res.json(product) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    } 
}

const removeByID = async (req, res) => {
    try {
        let id = req.profile
        let deletedProduct = await Product.findByIdAndDelete(id)

        res.json(deletedProduct)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    } 
}

const removeAll = async (req, res) => {
    try {
        await Product.deleteMany({})
        return res.status(200).json({ 
            message: "Removed all products!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    } 
}

export default {read, list, productByID, create, update, removeByID, removeAll}