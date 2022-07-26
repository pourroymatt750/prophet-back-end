import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
  answer: {type: String, required: true}
},{
  timestamps: true,
})

const questionSchema = new mongoose.Schema({
  question: {type: String, required: true},
  answers: [answerSchema],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true,
})

const Question = mongoose.model('Question', questionSchema)

export { Question }