const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
    username:String,
    email:String,
    password:String,
    isCreator:Boolean,

    // Here declearing the reference of the course that the user purchased
    // it will be the array of purchasedCourse because there could be more than one courses use can buy
    purchased_course:[{
        type: Schema.Types.ObjectId,
        ref:'course'
    }],
})


const admin = new Schema({
    username:String,
    email:String,
    password:String,
   
})

const course = new Schema({
    title:String,
    description:String,
    price:Number,
    isPublished:Boolean
})


const UserModule = mongoose.model('user',user);
const AdminModule = mongoose.model('admin',admin);
const CourseModule = mongoose.model('course',course);


module.exports =({
    UserModule,
    AdminModule,
    CourseModule,
})