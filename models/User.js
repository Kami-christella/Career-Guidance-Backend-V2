const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userRole:{
     type:String,
     enum: ['user', 'admin'],
     default:'user'
  },
  assessments: [{
    type: Schema.Types.ObjectId,
    ref: 'Assessment'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);


