 import cors from "cors"
 import express from 'express'
import mongoose from 'mongoose';
import fs from 'fs';
import multer from 'multer';
import { stringToHash } from "bcrypt-inzi";
import admin from "firebase-admin"


 let dbURI = 'mongodb+srv://abcd:abcd@cluster0.0nsp7aq.mongodb.net/socialmrdiaBase?retryWrites=true&w=majority';
  mongoose.connect(dbURI);

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());


app.use(cors({
    origin: ['http://localhost:3000', "https://the-great-mariamomina-site.netlify.app/product" ,"*"],
    // credentials: true
}));


////==================================

// https://firebase.google.com/docs/storage/admin/start

var serviceAccount ={
        "type": "service_account",
        "project_id": "mycrudapp-2ced8",
        "private_key_id": "e275436eb480aa2abccb0532e3fbe5f56bc4e8c8",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClzZdxpwugaJcZ\niJSE1BJNYo2xVaXtSR8hmZiaZzoXhuxhlqOZNrDVUmGM/mTUd6qhY9H4nZCu9K71\nZsJR6eZBtD40UU+T0E2jOV5bARu8eHBHDWtLX6xarTJgyDBFAIivM/b+3Dvq61oj\nGhim7PR2ir6okXN0N51ynz12Va3XLhg6NQFRanddxtoy5rHx4YnmqasVnMNHzHVT\nkKsYYUWFG10s+Vcp+hKe8rvXhNSMfWPLqbijITWBF6+RDJeGboMuN4u3P6zzlQpg\nmpXETcz2hS9Bo1chpv8IQz1EnVnyNBuf3XsB5ik1XID0Cn8kbtCmGBYs/k/2WX8b\nxtCInl/pAgMBAAECggEAQHapOYp5hkHz8Xz9RZGQlh7JuVdz/khOPsmRoAKffvM5\n541iiRjO8vmnLOLhwAvQvxPo2LEmRiei+I2d4qw+lnAmOUAd4Pn9nYcaDObm6kWn\nXbC1dSY7BDxPmHps7f8RpZDeKOPmteUQdBJa4FfDim1SSIbYrShMYnrQMjiIsN69\nQ2FGotGIOdbKIxYEFiFFo68S9K65aZbGxeNKGanKKXmc0pfzmb93CYmNXbJCKKic\n1OoBk1vvTC8aQ/oTh6bKq+TyBD/yq4ZMOfVgbHe0XUzxfKWpCUyOaNYd9/9onuPn\ndwrssLz9ysDYCwax8zFt48sEqwtL9QRkAGMgf7nawwKBgQDnvLxF3E9LbS6HaL/v\nNH59SFHJyDxcirXGSIjIYILbi9WFpjTMuPTIOYW+cl9q8yNZjXlPvRRLCN9GFzYF\nxAmgdVOJyKsas/pPK08K5LwMGrsQIj2H9w2K5JtoCkiBI2cV6f1kacKe4B34KL/y\niSKtnzk+Do6b1P/DG7MYrt5MIwKBgQC3KZ6rT6ZM9xw6t/HkZoSQI01CVSarv2R5\nJ6dexdXJEepENjLrSVwgzAdfFrGVUF0BAnJkkyX7OLwpm2QwvTtVXEmG/wMtq1KT\ns4IadIIgiP1tnj+UNiwqm2tc0x2oeWWe/xu5bDjVnzpv8HuAxHnQcGi325CFlbms\nCbsV5/aOgwKBgGt3IvhiyoL4BvPUp+2OMnp25zbkHNntmY5yZLxHxWd62XI5OZMW\n0q1nv5YqBAXc6y/EY9WOobKKUsB2Ux8pYi1/O1ZSMMcZX6MHOoiaunoCi21X86Dx\n+N3IVilRW35HpK6M7G18fjyfQkaq3xjib6qEhE87APdTN6iLV+rCbWRxAoGAK4mP\nF7V1GDJc2XBD5UChHgnmIXBQIt75qPrOA+8OpB7ICrK/Y8IqTflxfx7L02woz0af\nnlyD2LVhtJolNJimc+Hd8GLJhJ+Gn2k58cPj8ovdgaLuBfLiiLYszQG5uQQyLZsC\nIg8ha1XP9C+7i54oPm2Z1qowLjCq08P0Xn6m0rUCgYEAjXcWWQvkR23BAT1Q2VL+\nHlPIOP5vuBb+yO/2bEPNXSYkPvdL0uw01rND153if69J2zG6Qi4KiLDjQm/Ffag5\nwEWLz9jIvBerX4a8kEQaV9h/k33h1MbUAxg/ZKuXxvxZYDPGtBQAC+FXyeXdnpMe\nDaZMzHcvnUgWNStQG1Hy+q8=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-tscm0@mycrudapp-2ced8.iam.gserviceaccount.com",
        "client_id": "115915895330148959698",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tscm0%40mycrudapp-2ced8.iam.gserviceaccount.com"
      };
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://mycrudapp-2ced8.firebaseio.com"
    });
    const bucket = admin.storage().bucket("gs://mycrudapp-2ced8.appspot.com");


//==============================================

const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storageConfig })

//==============================================



const userSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String,  },
    password: { type: String,  },
    profilePicture: { type: String,  },

    createdOn: { type: Date, default: Date.now },
});
const userModel = mongoose.model('Users', userSchema);

/////==============================productSchema
const productSchema = new mongoose.Schema({

    name: { type: String },
    Price: { type: Number, required: true },
    description: { type: String, required: true },
    profilePicture: { type: String, required: true },
    code:{
        type:Number
    },

    createdOn: { type: Date, default: Date.now },
});
const productModel = mongoose.model('Productss', productSchema);

app.post("/signup", upload.any(), (req, res) => {

    let body = req.body;

    // console.log("body: ", body);
    // console.log("body: ", body.name);
    // console.log("body: ", body.email);
    // console.log("body: ", body.password);

    console.log("file: ", req.files[0]);

    if (!body.name
        || !body.email
        || !body.password
    ) {
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "name": "John",
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }


    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        {
            destination: `profilePhotos/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        // delete file from folder before sending response back to client (optional but recommended)
                        // optional because it is gonna delete automatically sooner or later
                        // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }


                        // check if user already exist // query email user
                        userModel.findOne({ email: body.email }, (err, user) => {
                            if (!err) {
                                console.log("user: ", user);

                                if (user) { // user already exist
                                    console.log("user already exist: ", user);
                                    res.status(400).send({ message: "user already exist,, please try a different email" });
                                    return;

                                } else { // user not already exist

                                    stringToHash(body.password).then(hashString => {

                                        userModel.create({
                                            name: body.name,
                                            email: body.email.toLowerCase(),
                                            password: hashString,
                                            profilePicture: urlData[0]
                                        },
                                            (err, result) => {
                                                if (!err) {
                                                    console.log("data saved: ", result);
                                                    console.log("user is created:", result )
                                                    res.status(201).send({
                                                        message: "user is created",
                                                        data: {
                                                            name: body.name,
                                                            email: body.email.toLowerCase(),
                                                            profilePicture: urlData[0]
                                                        }
                                                   
                                                    });
                                                } else {
                                                    console.log("db error: ", err);
                                                    res.status(500).send({ message: "internal server error" });
                                                }
                                            });
                                    })

                                }
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "db error in query" });
                                return;
                            }
                        })


                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });








});

/////======================

// app.post("/product", async (req, res) => {

//     console.log("product received: ", req.body);

//     let newProduct = new productModel({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         code: req.body.code,
//     })
//     try {
//         let response = await newProduct.save()
//         console.log("product added: ", response);

//         res.send({
//             message: "product added",
//             data: response
//         });
//     } catch (error) {
//         res.status(500).send({
//             message: "failed to add product"
//         });
//     }
// })

app.post("/product",  upload.any(), (req, res) => {

    let body = req.body;

    console.log("body: ", body);
    // console.log("body: ", body.name);
    // console.log("body: ", body.email);
    // console.log("body: ", body.password);

    console.log("file: ", req.files[0]);

    // if (!body.name
    //     || !body.email
    //     || !body.password
    // ) {
    //     res.status(400).send(
    //         `required fields missing, request example: 
    //             {
    //                 "name": "John",
    //                 "email": "abc@abc.com",
    //                 "password": "12345"
    //             }`
    //     );
    //     return;
    // }


    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        {
            destination: `profilePhotos/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        // delete file from folder before sending response back to client (optional but recommended)
                        // optional because it is gonna delete automatically sooner or later
                        // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }


                        // check if user already exist // query email user
                        // userModel.findOne({ email: body.email }, (err, user) => {
                        //     if (!err) {
                        //         console.log("user: ", user);

                        //         if (user) { // user already exist
                        //             console.log("user already exist: ", user);
                        //             res.status(400).send({ message: "user already exist,, please try a different email" });
                        //             return;

                        //         } else { // user not already exist

                        //             stringToHash(body.password).then(hashString => {

                        //                 userModel.create({
                        //                     name: body.name,
                        //                     email: body.email.toLowerCase(),
                        //                     password: hashString,
                        //                     profilePicture: urlData[0]
                        //                 },
                        //                     (err, result) => {
                        //                         if (!err) {
                        //                             console.log("data saved: ", result);
                        //                             console.log("user is created:", result )
                        //                             res.status(201).send({
                        //                                 message: "user is created",
                        //                                 data: {
                        //                                     name: body.name,
                        //                                     email: body.email.toLowerCase(),
                        //                                     profilePicture: urlData[0]
                        //                                 }
                                                   
                        //                             });
                        //                         } else {
                        //                             console.log("db error: ", err);
                        //                             res.status(500).send({ message: "internal server error" });
                        //                         }
                        //                     });
                        //             })

                        //         }
                        //     } else {
                        //         console.log("db error: ", err);
                        //         res.status(500).send({ message: "db error in query" });
                        //         return;
                        //     }
                        // })
                    }
                    console.log("product received: ", req.body);
               

    let newProduct = new productModel({
        name:req. body.name,
        description: req.body.description,
        Price: req.body.price,
        code:req. body.code,
        profilePicture: urlData[0]
    })
    try {
        let response =  newProduct.save()
        console.log("product added: ", response);

        res.send({
            message: "product added",
            data: response
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to add product"
        });
    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });









});


////======================last step===========

app.get('/users', async (req,res)=>{
    try{
        let users= await userModel.find({}).exec();
        console.log("all users" , users);

        res.send({
            message:'all users',
            data : users
        });

    }catch{ (err) => {
        res.status(500).send({
            message:'failed to get users'
        });
    }

    }
})

////======================last step===========

app.get('/products', async(req,res)=>{
    try{
        let products= await productModel.find({}).exec();
        console.log("all products" , products);

        res.send({
            message:'all products',
            data : products
        });

    }catch{ (err) => {
        res.status(500).send({
            message:'failed to get products'
        });
    }

    }
});

 
     app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////