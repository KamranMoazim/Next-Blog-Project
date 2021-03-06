const { validationResult } = require("express-validator");


exports.runValidation = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
        // throw Error(errors.array()[0].msg);
    }
}