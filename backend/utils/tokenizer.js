const jwt = require('jsonwebtoken');

function tokenize(username, email, timeInMs){
    const token = jwt.sign(
        {username, email}, 
        process.env.SECRET_KEY, 
        {expiresIn: timeInMs}
    )
    return token
}

module.exports = tokenize;