import mongoose from "mongoose";
const requestSchema = new mongoose.Schema({
    name:{
        type: String,
        ref:'users',
        // required:true
    },
    trainID:{
        type:String,
        required:true
    },
    boardingStation:{
        type:String,
        required:true
    },
    destinationStation:{
        type:String,
        required:true
    },
    dt: {
        type: String,
        required: true
    },
    isSwap:
    {
      type:Boolean,
      required:true,
    },
    preferences: [{
        coach: {
            type: String,
            required: true
        },
        seatNo: {
            type: String,
            required: true
        }
    }]
},
{
    timestamps: true
});


const Request=mongoose.model('Request', requestSchema);
export default Request;