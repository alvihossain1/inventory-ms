const express = require('express')
const app = express()
const cors = require("cors")



// DATABASE START

var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventorydb'
});


db.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + db.threadId);
});


// DATABASE END
app.use(cors())
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.send("<h1 style='text-align: center; background-color: olive;'>Server Running Okay</h1>")
})


 // CREATING PRODUCT
app.post('/api/products', (req, res) => {
   
    console.log(req.body);

    db.connect(function (err) {
        console.log("Connected!");
        var sql = `INSERT INTO producttb (productName, productDescription, price, quantity, type) VALUES ('${req.body.productName}', '${req.body.productDescription}', '${req.body.price}' , '${req.body.quantity}', '${req.body.type}')`;

        db.query(sql, (err, results) => {
            try {
                if (err) throw err;
                console.log("SQL: ", results)
                let object = Object.assign({"productID": results.insertId.toString()}, req.body)
                res.send([object])
            }
            catch (err) {
                res.send(err.message)
            }
        });

    });
})

// FETCH PRODUCT
app.get('/api/products', (req, res) => {
    db.connect(function (err) {
        console.log("Connected!");
        var sql = `SELECT * FROM producttb`;

        db.query(sql, (err, results) => {
            try {
                if (err) throw err;
                console.log("SQL: ", results)
                res.send(results)
            }
            catch (err) {
                res.send(err.message)
            }
        });

    });

})

// FETCH PRODUCT BY ID
app.get('/api/products:id', (req, res) => {
    let id = req.params['id'].replace(":", "");
    console.log(id)
    db.connect(function (err) {
        console.log("Connected!");
        var sql = `SELECT * FROM producttb WHERE productID = ${id}`;

        db.query(sql, (err, results) => {
            try {
                if (err) throw err;
                console.log("SQL: ", results)
                res.send(results)
            }
            catch (err) {
                res.send(err.message)
            }
        });

    });

})

// UPDATE PRODUCT BY ID
app.put('/api/products:id', (req, res) => {
    let id = req.params['id'].replace(":", "");
    console.log(req.body);

    db.connect(function (err) {
        console.log("Connected!");
        var sql = `UPDATE producttb SET productName = '${req.body.productName}', productDescription = '${req.body.productDescription}', price = '${req.body.price}', quantity = '${req.body.quantity}', type =  '${req.body.type}' WHERE productID = ${id}`;

        db.query(sql, (err, results) => {
            try {
                if (err) throw err;
                console.log("SQL: ", results)
                let object = Object.assign({"productID": id.toString()}, req.body)
                console.log(object)
                res.send([object])
            }
            catch (err) {
                res.send(err.message)
            }
        });

    });

})

// DELETE PRODUCT BY ID
app.delete('/api/products:id', (req, res) => {
    let id = req.params['id'].replace(":", "");
    console.log(id)
    db.connect(function (err) {
        console.log("Connected!");
        var sql = `DELETE FROM producttb WHERE productID = ${id};`;

        db.query(sql, (err, results) => {
            try {
                if (err) throw err;
                console.log("SQL: ", results)
                res.send("Product has been deleted.")
            }
            catch (err) {
                res.send(err.message)
            }
        });

    });

})



const port = 4000
app.listen(port)
console.log(`Server is running on port ${port}`)