import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const contactSchema = new Schema(
    {
      names:{
          type: String,
          required:true
      },
      email:{
        type: String,
        required:true
    },
    message:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    status: {
        type: String,
        required: false,
        default: "unresponded",
        enum: ["unresponded", "responded"]
      },
  },
    {
        timestamps:true
    }
        
)

const Contact = model("Contact", contactSchema);

export default Contact;
