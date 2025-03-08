const mongoose = require("mongoose")
require("dotenv").config()

exports.DbConnection=()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{console.log("connect to database properly");
    }).catch((error)=>{console.log(error);
    })
}