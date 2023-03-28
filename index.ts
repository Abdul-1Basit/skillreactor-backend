import express,{ Request, Response } from 'express';
// const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser=require('body-parser')
const fileRoutes = require('./src/routes/imgRoutes.ts')
const dotenv=require('dotenv')
const app = express();

dotenv.config()

// middlewares
// app.use(fileUpload({
//   createParentPath: true
// }));
app.use(cors()); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use('/api/file',fileRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Application works !');
  // console.log('request recieved',req.files)
});
const port = process.env.PORT || 3000;

app.listen(port, () => 
  console.log(`Running Backend on port ${port}.`)

);
export default app;