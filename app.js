const express = require('express')
const exphbs = require('express-handlebars')
const resList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = resList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))

  res.render('index', { foods:restaurants, keyword })
})

app.get('/restaurants/:restaurant_id',(req, res) => {
  const restaurant = resList.results.find(restaurant =>restaurant.id == req.params.restaurant_id
  )

  res.render('show', { restaurant:restaurant })
})

app.get('/', (req, res) => {
  res.render('index', { foods:resList.results})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})