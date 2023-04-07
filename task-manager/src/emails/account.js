const sgMail=  require('@sendgrid/mail')
console.log("sg api",process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SEND_GRID_APIKEY)

const sendWelcomeMail=(email,name)=>{
    console.log('INside welcomme',email)

sgMail.send({
    to:email,
    from:'ratanupadhyay6835@gmail.com',
    subject:`Welcome ${name} to the chat-box `,
    text:`Hello ${name} hope you are doing well` 
})
}

const sendCancellationMail=(email,name)=>{
    console.log('INside cancel',email)
    sgMail.send({
        from:'ratanupadhyay6835@gmail.com',
        to:email,
        subject:'Account deleted',
        subject:`Your account is deleted . Hope to see you soon ${name}`
    })
}

module.exports={
    sendWelcomeMail,
    sendCancellationMail
}