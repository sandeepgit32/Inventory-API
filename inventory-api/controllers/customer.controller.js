const Customer = require("../models/customer_model.js");
const apiResponse = require("../helpers/apiResponse");

//Endpoint example: /customers?city=Kolkata
var addQueryElement_obj = (query_obj, query_str_key, query_str_value) => {
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


// Retrieve and return all cutomers' information from the database.
exports.findAll = (req, res) => {
    Note.find()
        .then(notes => apiResponse.successResponse200(res, notes))
        .catch(err => apiResponse.ErrorResponse500(res, err))
};

// Create and Save the information of a new customer into the database

// Find a single customer's information with a customerId

// Update (patch) the information of a customer  identified by the customerId in the request

// Delete the information of a customer with the specified customerId in the request

