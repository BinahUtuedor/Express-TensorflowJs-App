const express = require('express')
const path = require('path')
const tf = require('@tensorflow/tfjs')

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res, next) => {
  res.render('form', { title: 'Prediction Form' })
})

app.post('/predict', async (req, res, next) => {
  // Create simple mnodel
  const x = req.body.inputValue
  model = tf.sequential()
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }))

  // Compile model
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })

  // generate training data (y = 3x + 1)
  const xs = tf.tensor2d([2, 4, 0, -1, 5, 3], [6, 1])
  const ys = tf.tensor2d([7, 13, 1, -2, 16, 10], [6, 1])

  // Train the model
  await model.fit(xs, ys, { epochs: 250 })

  // Make a precition
  const prediction = model
    .predict(tf.tensor2d([+x], [1, 1]))
    .dataSync()[0]
    .toPrecision(5)

  res.render('prediction', { prediction, title: 'Result Page' })
})

app.listen(3000, () => console.log('Server Running on port 3000'))
