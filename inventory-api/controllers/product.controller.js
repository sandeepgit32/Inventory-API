const mongoose = require("mongoose");
const Product = require("../models/product.model.js");
const apiResponse = require("../helpers/apiResponse");
const utils = require("../helpers/utils");


// Retriee and return all products' information from the database.
exports.findAll = (req, res, next) => {
    if (Object.keys(req.query).length === 0){
        var product_res = Product.find()
    } else {
        var query_obj = {}
        query_obj = utils.addElement_obj(query_obj, 'product_code', req.query.product_code)
        query_obj = utils.addElement_obj(query_obj, 'name', req.query.name)
        query_obj = utils.addElement_obj(query_obj, 'category', req.query.category)
        query_obj = utils.addElement_obj(query_obj, 'supplier', req.query.supplier)
        query_obj = utils.addFilteredElement_obj(query_obj, 'u_buy', req.query.u_buy)
        query_obj = utils.addFilteredElement_obj(query_obj, 'u_sell', req.query.u_sell)
        var product_res = Product.find(query_obj)
    }
    product_res
        .exec()
        // Only select some specific attributes: _id, product_code, name, category
        .then(products => products.map(product => {
            return {
                _id: product._id,
                product_code: product.product_code,
                name: product.name,
                category: product.category
            };
        }))
        .then(products => apiResponse.successResponse200(res, products))
        .catch(err => apiResponse.ErrorResponse500(res, err));
};

// Create and Save the information of a new product into the database
exports.create = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return apiResponse.validationError400(res,'Product content cannot be empty');
    }
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        product_code: req.body.product_code,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        supplier: req.body.supplier,
        u_sell: req.body.u_sell,
        u_buy: req.body.u_buy,
        u_measure: req.body.u_measure,
    });
    product
        .save()
        .then(data => apiResponse.createdResponse201(res, 'Successfully created', data))
        .catch(err => apiResponse.ErrorResponse500(res, err));
};

// Find a single product's information with a productID
exports.findOne = (req, res) => {
    Product.findById(req.params.productID)
        .then(product => {
            if (!product) {
                return apiResponse.notFoundResponse404(res,`Product not found with id ${req.params.productID}`);
            }
            return apiResponse.successResponse200(res, product);
        })
        .catch(err => apiResponse.ErrorResponse500(res, err))
};

// Update (patch) the information of a product identified by the productID in the request
exports.updateInfo = (req, res) => {
    const id = req.params.productID;
    var updateObject = req.body;
    Product.updateOne({ _id: id }, { $set: updateObject })
        .exec()
        .then(data => {
            if (data.n==0) {
                return apiResponse.notFoundResponse404(res,`Product not found with id ${id}`);
            }
            return apiResponse.createdResponse201(res,'Successfully modified',data)
        })
        .catch(err => apiResponse.ErrorResponse500(res, err));
};


// Delete the information of a product with the specified productID in the request