const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
     res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
     const firstName = req.body.fname;
     const lastName = req.body.lname;
     const email = req.body.email;

     const data = {
          members: [
               {
                    email_address: email,
                    status: 'subscribed',
                    merge_fields: {
                         FNAME: firstName,
                         LNAME: lastName
                    }
               }
          ]
     };

     const jsonData = JSON.stringify(data);

     const url = "https://us11.api.mailchimp.com/3.0/lists/79b756703b";

     const options = {
          method: "POST",
          auth: "gyan1:71bc3f1934668a92a7b8a1229c9d4c74-us11"
     }

     const request = https.request(url, options, (response) => {
          
          if(response.statusCode === 200) {
               res.sendFile(__dirname + "/success.html");
          }else{
               res.sendFile(__dirname + "/failure.html");
          }
          
          response.on("data", (data) => {
               console.log(JSON.parse(data));
          })
     })

     request.write(jsonData);
     request.end();
});

app.post("/failure", (req, res) => {
     res.redirect("/")
})

app.listen(process.env.PORT || port, () => { 
     console.log(`Server is running on port ${port}`);
})

// 71bc3f1934668a92a7b8a1229c9d4c74-us11

// 79b756703b