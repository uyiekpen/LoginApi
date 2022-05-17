const hapijoy = require("@hapi/joi")

const validateForm = (data) => {
    const Formdata = hapijoy.object({
        UserName : hapijoy.string(),
        email : hapijoy.string(),
        password : hapijoy.string(),
    })
    return Formdata.validate(data)
}

module.exports.validateForm = validateForm