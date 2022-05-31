const { Schema, SchemaTypes, model } = require('mongoose')

const birthdateSchema = new Schema({
  day: {
    type: Number,
    required: [true, 'birthdate day is required']
  },
  month: {
    type: Number,
    required: [true, 'birthdate month is required']
  },
  year: {
    type: Number,
    required: [true, 'birthdate year is required']
  }
})

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'firstname is required'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'lastname is required'],
    },
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'username is required'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      text: true, // for better searches
      required: [true, 'email is required'],
    },
    passwordHash: {
      type: String,
      required: [true, 'password is required'],
    },
    pictureUrl: {
      type: String,
      default: 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'
    },
    coverUrl: String,
    gender: {
      type: String,
      enum: ['M', 'F'],
      required: [true, 'gender is required']
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    birthdate: birthdateSchema,
    friends: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: []
    },
    followers: {
      type: Array,
      default: []
    },
    requests: {
      type: Array,
      default: []
    },
    savePosts: [{
      post: {
        type: SchemaTypes.ObjectId,
        ref: 'Post'
      }
    }],
    searchs: [{
      user: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
      }
    }],
    details: {
      bio: String,
      job: String,
      college: String,
      hometown: String,
      otherName: String,
      workplace: String,
      highSchool: String,
      currentCity: String,
      relationship: {
        type: String,
        enum: ['Single', 'Married', 'In a relationship']
      },
      instagram: String,
      twitter: String,
    }
  },
  {
    timestamps: true
  }
)


module.exports = model('User', userSchema, 'users')
