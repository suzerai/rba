const express = require('express')
const request = require('request')
const https = require('https')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/signup.html')
})

app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = 'https://us21.api.mailchimp.com/3.0/lists/e0c22e1d76'

    const options = {
        method: "POST",
        auth: "gio:6556730ef15214e2bf049987f52fa144-us21"
    }
    const request = https.request(url, options, (response) => {
        const statusCode = response.statusCode;

        if(statusCode !== 200)
        {
            res.sendFile(__dirname +'/failure.html')
        }

        res.sendFile(__dirname +'/success.html')

        response.on('data', (data) => {
            
        })
    })

    request.write(jsonData)
    request.end()
})

app.post('/failure', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000")
})