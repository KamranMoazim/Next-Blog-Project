const { validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_KEY)

exports.contactForm = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    const {email, name, message} = req.body

    const emailData = {
        to:process.env.EMAIL_TO,
        from:email,
        subject:`Contact Form - ${process.env.APP_NAME}`,
        text:`Email received from contact FORM \n Sender Name : ${name} \n Sender Email : ${email} \n Sender Message : ${message}`,
        html:`
            <h4>Email received from contact FORM</h4>
            <p>Sender Name : ${name}</p>
            <p>Sender Email : ${email}</p>
            <p>Sender Message : ${message}</p>
            <hr/>
            <p>This Email may containe sensitive Information!</p>
            <p>https://seoblog.com</p>
        `
    }

    sgMail.send(emailData)
        .then((res)=>{
            return res.json({
                success:true
            })
        })
}


exports.blogAuthorContactForm = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    const {authorEmail, email, name, message} = req.body

    let mailList = [authorEmail, process.env.EMAIL_TO]

    const emailData = {
        to:mailList,
        from:email,
        subject:`Someone messaged you from ${process.env.APP_NAME}`,
        text:`Email received from contact FORM \n Sender Name : ${name} \n Sender Email : ${email} \n Sender Message : ${message}`,
        html:`
            <h4>Message received!</h4>
            <p>Name : ${name}</p>
            <p>Email : ${email}</p>
            <p>Message : ${message}</p>
            <hr/>
            <p>This Email may containe sensitive Information!</p>
            <p>https://seoblog.com</p>
        `
    }

    sgMail.send(emailData)
        .then((res)=>{
            return res.json({
                success:true
            })
        })
}
