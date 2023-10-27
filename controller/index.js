let db = require('../config/db.config')
let Validator = require('validatorjs')
const Helper = require("../helper/helpers")
exports.store = async (req, res, next) => {
    let { name, detail } = req.body
    let rules = {
        name: "required",
        detail: "required",
    };
    
    let error_msg = {
        in: "invalid :attribute",
    };
    let id = await Helper.getId()
    
    let sql = `INSERT INTO todos
    (id, name, detail, created_at, updated_at)
    VALUES
    (${id}, '${name}', '${detail}', now(), now())
    `
    
    let validation = new Validator({ name, detail }, rules, error_msg);
    validation.checkAsync(passes, fails);
    
    function fails() {
        let message = [];
        for (var key in validation.errors.all()) {
            var value = validation.errors.all()[key];
            message.push(value[0]);
        }
        return res.status(200).json({
            code: 401,
            status: "error",
            message: message,
            offset: offset,
            limit: limit,
            total: 0,
            result: [],
        });
    }

    async function passes() {
        try {
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.json({
                    code: 201,
                    status: 'success',
                    message: ['success store data'],
                    result: []
                })
            })
        } catch (err) {
            err.message = err.message.includes("SQLState")
            ? "Query syntax error."
            : err.message;
            res.json({
                code: 400,
                status: "error",
                message: [err.message],
                offset: offset,
                limit: limit,
                total: 0,
                result: [],
            });
        }
    }
    
}