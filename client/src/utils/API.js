import axios from "axios";

var api_key = "SEM3194D5A56DEB61A3CCC32B6DDFA563963";
var api_secret = "YWZhYWUxMjEzNGMxODgxOTc0MTdhMmIzODlmYTBmMTM";
var sem3 = require('semantics3-node')(api_key,api_secret);

var endpoint = "products";
var method = "GET";
var jsonStr = '{"search" : "nike"}';

export default {

    getAPIProducts: function() {
        return axios.post("/api", function() {
            sem3.run_query(endpoint, jsonStr, method, function(err, products) {
                if (err) {
                    return console.error("Couldn't execute query: get_products");
                }
        
                console.log( products );
            });
        });
    },

    saveProduct: function(productData) {
        return axios.post("/api/products", productData);
    },

    getSavedProducts: function() {
        return axios.get("/api/products");
    },

    deleteProduct: function(id) {
        return axios.delete("api/products/" + id);
    }

};