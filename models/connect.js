const db = require("mongoose")



db.connect(process.env.DB_URL).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
})