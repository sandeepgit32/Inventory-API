const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Supplier = require("../models/supplier_model.js");

var http_error_500 = err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
}

var addElement_obj = (query_obj, query_str_key, query_str_value) => {
    if (query_str_value) {
        if (typeof query_str_value == "string") {
            // For case insensitive search in case of string
            query_obj[query_str_key] = {$regex:"^"+query_str_value+"$", $options:"i"}
        } else {
            query_obj[query_str_key] = query_str_value
        }
    } 
    return query_obj
}

router.get("/", (req, res, next) => {
    if (Object.keys(req.query).length === 0){
        var supplier_res = Supplier.find()
    } else {
        var query_obj = {}
        query_obj = addElement_obj(query_obj, 'supplier_name', req.query.supplier_name)
        query_obj = addElement_obj(query_obj, 'city', req.query.city)
        query_obj = addElement_obj(query_obj, 'email', req.query.email)
        var supplier_res = Supplier.find(query_obj)
    }
    supplier_res
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                suppliers: docs.map(doc => {
                    return {
                        _id: doc._id,
                        supplier_code: doc.supplier_code,
                        supplier_name: doc.supplier_name,
                        city: doc.city,
                        description: doc.description,
                        supplier: doc.supplier,
                        u_sell: doc.u_sell,
                        u_buy: doc.u_buy,
                        u_measure: doc.u_measure,
                    };
                })
            };
            res.status(200).json(response);
            })
        .catch(http_error_500);
});


router.post("/", (req, res, next) => {
    const supplier = new supplier({
        _id: new mongoose.Types.ObjectId(),
        supplier_name: req.body.supplier_name,
        address: req.body.address,
        zipcode: req.body.zipcode,
        city: req.body.city,
        contact_person: req.body.contact_person,
        phone: req.body.phone,
        email: req.body.email,
        fax: req.body.fax,
    });
    supplier
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created supplier successfully",
                createdsupplier: {
                    _id: result._id,
                    supplier_name: result.supplier_name,
                    address: result.address,
                    zipcode: result.zipcode,
                    city: result.city,
                    contact_person: result.contact_person,
                    phone: result.phone,
                    email: result.email,
                    fax: result.fax,
                }
            });
        })
        .catch(http_error_500);
});


router.get("/:supplierId", (req, res, next) => {
    const id = req.params.supplierId;
    Supplier.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    supplier: doc,
                });
            } else {
                res.status(404).json({ 
                message: "No valid entry found for provided ID" 
                });
            }
        })
        .catch(http_error_500);
});


router.patch("/:supplierId", (req, res, next) => {
    const id = req.params.supplierId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Supplier.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'supplier updated',
            });
        })
        .catch(http_error_500);
});


router.delete("/:supplierId", (req, res, next) => {
    const id = req.params.supplierId;
    Supplier.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Supplier deleted',
            });
        })
        .catch(http_error_500);
});

module.exports = router;