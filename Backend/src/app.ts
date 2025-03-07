import express from 'express'


const app = express()

app.use(express.json())

app.use('/',(req, res)=>{
  res.send('Hello!!!')
})

app.use((_, res, next) => {
  res.status(404).send({ message: 'Resource not found' });
  next();
});


export default app;