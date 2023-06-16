const express    = require('express')
const config     = require('config')
const app        = express()
const loginRoute = require('./routes/login')

app.use(express.json());
app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers', "*");
    response.setHeader('Access-Control-Allow-Methods',"*");
    next();
});

app.use('/login',loginRoute);

app.listen(config.PORT, () => {
  console.log(`Node server listening on port ${config.PORT}`)
})
