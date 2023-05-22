import Category from "../models/category.js"
import slugify from 'slugify'

function createCatList(categories, parentId = null){
    const categoryList = []
    let category
    if(parentId ==null){
        category = categories.filter(cat => cat.parentId == undefined)
    }
    else{
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cat of category){
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCatList(categories, cat._id)
        })
    }
    return categoryList
}

const createCat = (req, res) =>{
    const catObject = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    
    if(req.file){
        catObject.catImg = process.env.API + '/' + slugify(req.file.filename)
    }

    if(req.body.parentId){
        catObject.parentId = req.body.parentId
    }

    const cat = new Category(catObject)
    cat.save((error, category) => {
        if(error){
            return res.status(400).json({ error })
        }
        if(category){
            return res.status(201).json({ category })
        }
    })
}

const getCat = (req, res) => {
    Category.find({})
    .exec((error, category) => {
        if(error){
            return res.status(400).json({
                message: "Category Not Found"
            })
        }
        if(category){
            const catList = createCatList(category)
            return res.status(200).json({
                catList
            })
        }
    })
}

export {createCat, getCat }