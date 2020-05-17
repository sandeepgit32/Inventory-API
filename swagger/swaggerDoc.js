const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Rest API for Inventory management",
            description: "Inventory management App API Information",
            contact: {
                name: "Sandip"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ['./inventory-api/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
