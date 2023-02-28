async function createModel() {
  // Create simple mnodel
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
  const prediction = model.predict(tf.tensor2d([10], [1, 1])).dataSync()[0]

  document.getElementById('prediction-result').innerText =
    prediction.toPrecision(5)
}

createModel()
