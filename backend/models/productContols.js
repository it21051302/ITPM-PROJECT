import express from 'express'
import slugify from 'slugify'
import Product from '../models/product-schema.js'


const createProduct = (req, res) =>{
    
    const {
        name, price, stock, description, category
    } = req.body
    let productPics = []

    if(req.files.length > 0){
        productPics = req.files.map(file => {
            return { img: process.env.API + '/' +slugify(file.filename) }
        })
    }

    const product  = new Product({
        name,
        slug: slugify(req.body.name),
        price,
        stock,
        description,
        productPics,
        category,
        createdBy: req.user._id
    })
    product.save(((error, product) => {
        if(error){
            return res.status(400).json({ error })
        }
        if(product){
            res.status(201).json({ product })
        }
    }))
}

export { createProduct }