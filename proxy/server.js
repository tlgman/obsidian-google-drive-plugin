const express = require('express');
const cors = require('cors');
const axios = require('axios');
const port = 9001;

const app = express();

app.use(cors());


app.all('/', (req, res) => {
  const request = req.query.request;
  if(!request) {
    res.status(400).send('request parameter not found.');
    return;
  }
  console.log('request: ', request);
  axios({
    url: request,
    method: req.method
  }).then((axRes) => {
    console.log('result from request ', axRes);
  });
  const jsonCache = [];
  /*console.log(req.headers);
  console.log(req);*/
  // axios(res.url).then();
  res.json(JSON.parse(JSON.stringify(req, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      // Duplicate reference found, discard key
      if (jsonCache.includes(value)) return;
  
      // Store value in our collection
      jsonCache.push(value);
    }
    return value;
  })));

  /*console.log('req: ', req);
  console.log('res: ', res);*/
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});