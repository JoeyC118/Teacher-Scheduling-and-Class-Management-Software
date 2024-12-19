const mongoose = require('mongoose')
const connectDB = async() =>{
    try{
        const conn = await mongoose.connect('mongodb+srv://josephcusumano811:hci9fgQiu25GkgJn@cluster0.9wkx2d5.mongodb.net/schedule' )
    console.log('MongoDB Connected')
    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }

}
module.exports = connectDB