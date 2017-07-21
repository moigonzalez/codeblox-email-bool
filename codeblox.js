const mailcomposer = require('mailcomposer')

module.exports.default = (event, context, callback) => {
  const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  })

  const sequenceName = process.env.SEQUENCE_NAME
  const sequenceDescription = process.env.SEQUENCE_DESCRIPTION

  if (event.input === true) {
    const mail = mailcomposer({
      from: `Rainator <moigonzit@gmail.com>`,
      to: process.env.USER_EMAIL,
      subject: sequenceName,
      html: `${sequenceName}<br>${sequenceDescription}`
    })

    mail.build((error, message) => {
      if (error) {
        return callback(error)
      }
      mailgun.messages().sendMime({
        to: process.env.USER_EMAIL,
        message: message.toString('ascii')
      })
      .then(() => {
        callback(null, event.input)
      })
    })
  } else {
    callback(null, event.input)
  }
}