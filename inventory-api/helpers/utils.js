//Endpoint example: /products?category=sports
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

//Endpoint example: /products?u_sell={"lt": 150, "gt": 30}
var addFilteredElement_obj = (query_obj, query_str_key, query_str_value) => {
    if (query_str_value) {
        var entity = JSON.parse(query_str_value)
        if (entity.lt && entity.gt){
            query_obj[query_str_key] = {$lt: entity.lt, $gt: entity.gt}
        } else if (entity.lt && entity.gte){
            query_obj[query_str_key] = {$lt: entity.lt, $gte: entity.gte}
        } else if (entity.lte && entity.gt){
            query_obj[query_str_key] = {$lte: entity.lte, $gt: entity.gt}
        } else if (entity.lte && entity.gte){
            query_obj[query_str_key] = {$lte: entity.lte, $gte: entity.gte}
        } else if (entity.lt){
            query_obj[query_str_key] = {$lt: entity.lt}
        } else if (entity.lte){
            query_obj[query_str_key] = {$lte: entity.lte}
        } else if (entity.gt){
            query_obj[query_str_key] = {$gt: entity.gt}
        } else if (entity.gte){
            query_obj[query_str_key] = {$lte: entity.gte}
        }
    }
    return query_obj
}