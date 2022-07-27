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

export function index(req,res) {
  Question.find({})
  .populate('owner')
  .then(questions => {
    res.json(questions)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export function deleteOne(req, res) {
  Question.findById(req.params.id)
  .then(question => {
    if (question.owner._id.equals(req.user.profile)) {
      Question.findByIdAndDelete(question._id)
      .then(deletedQuestion => {
        res.json(deletedQuestion)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export function update(req, res) {
  Question.findById(req.params.id)
  .then(question => {
    if (question.owner._id.equals(req.user.profile)) {
      Question.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedQuestion => {
        res.json(updatedQuestion)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}