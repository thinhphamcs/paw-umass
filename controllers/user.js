// Import require
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

/**
 * Create the database
 * Host can be change with the ip address of server instead of 'localhost'
 * XAMPP by default using 'root' as 'user' and 'empty' as 'password'
 * MAMPP/WAMPP by default using 'root' as 'user' and 'root' as 'password'
 */
const userDB = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

/**
 * Create the database
 * Host can be change with the ip address of server instead of 'localhost'
 * XAMPP by default using 'root' as 'user' and 'empty' as 'password'
 * MAMPP/WAMPP by default using 'root' as 'user' and 'root' as 'password'
 */
const assetDB = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_ASSET
});

// Connect to database
userDB.connect((err) => {
    if (err) {
        console.log(err); // Should print the error message
    }
    else {
        console.log("MySQL Connected For Users..."); // Should print this message in console to prove it is connected
    }
});

// Connect to database
assetDB.connect((err) => {
    if (err) {
        console.log(err); // Should print the error message
    }
    else {
        console.log("MySQL Connected For Assets..."); // Should print this message in console to prove it is connected
    }
});

// Export as module
exports.submit = async (req, res) => {
    try {
        let sampleFiles, uploadPath;
        const { petName, breed, description, radio } = req.body;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({
                message: "No files were uploaded."
            });
        }
        else {
            // name of the input is sampleFile
            sampleFiles = req.files.photo;
            uploadPath = 'uploads\\' + sampleFiles.name; // __dirname = main director name of the project

            // Use mv() to place file on the server
            sampleFiles.mv(uploadPath, function (err) {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                }
                else {
                    // We decode the token to find out what id does this user belong to
                    if (jwt.decode(req.headers.authorization)) {
                        const id = jwt.decode(req.headers.authorization, { complete: true }).payload.id;
                        // We then check if user is authenticated or not
                        userDB.query('SELECT email, phone FROM users WHERE id = ?', [id], async (err, results) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                if (results.length === 0) {
                                    res.status(404).json({
                                        auth: false,
                                        message: 'User no longer exists'
                                    });
                                }
                                else {
                                    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
                                    const date = new Date(); // .toISOString().slice(0, 19).replace('T', ' ')
                                    year = date.getFullYear();
                                    month = date.getMonth() + 1;
                                    day = date.getDate();
                                    if (day < 10) {
                                        day = '0' + day;
                                    }
                                    if (month < 10) {
                                        month = '0' + month;
                                    }
                                    const finalDate = year + "-" + month + "-" + day;
                                    // This way is better to prevent SQL injection
                                    let data = {
                                        email: results.map(item => item.email),
                                        phone: results.map(item => item.phone),
                                        petName: petName.trim(),
                                        breed: breed.trim(),
                                        photo: sampleFiles.name,
                                        description: description.trim(),
                                        howLong: radio.trim(),
                                        date: finalDate,
                                        token: token
                                    };

                                    // Insert data to our database
                                    assetDB.query('INSERT INTO assets SET ?', data, (err, results) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (results.length === 0) {
                                                res.status(404).json({
                                                    message: 'Nothing got inserted',
                                                    home: false
                                                });
                                            }
                                            else {
                                                res.status(200).json({
                                                    message: 'Asset Registered',
                                                    home: true
                                                }); // Asset registered
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else {
                        res.status(404).json({
                            auth: false,
                            message: "Unauthorized User",
                        });
                    }
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// Export as module
exports.donate = async (req, res) => {
    try {
        const { amount, id } = req.body;
        const donation = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "PawUMass Donation",
            payment_method: id,
            confirm: true
        });
        console.log("Donation", donation);
        res.status(200).json({
            message: "Donation Successful",
            success: true
        })
    } catch (err) {
        console.log("Error", err);
        res.status(400).json({
            message: "Donation failed.",
            success: false
        });
    }
}