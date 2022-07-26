import { Question } from "../models/question.js"

export function create(req, res) {
  req.body.owner = req.user.profile
  Question.create(req.body)
  .then(question => {
    Question.findById(question._id)
    .populate('owner')
    .then(populatedQuestion => {
      res.json(populatedQuestion)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}