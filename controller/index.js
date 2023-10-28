let db = require('../config/db.config')
let Validator = require('validatorjs')
const Helper = require("../helper/helpers")
exports.store = async (req, res, next) => {
    let { name, detail } = req.body
    let rules = {
        detail: "required",
    };
    
    let error_msg = {
        required: ":attribute cannot be null",
        // in: "invalid :attribute",
    };
    let id = await Helper.getId()
    
    let sql = `INSERT INTO todos
    (id,  detail, created_at, updated_at)
    VALUES
    (${id}, '${detail}', now(), now())
    `
    
    let validation = new Validator({ detail }, rules, error_msg);
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

exports.list = async (req, res, next) => {
    let order = req.query.order === 'created' ? 'created_at' : req.query.order
    let sort = req.query.sort ? req.query.sort : 'asc'
    let limit = req.query.limit ? req.query.limit : 5
    let offset = req.query.offset ? req.query.offset : 0
    let rules = {
        order: "required",
        sort: "required",
        limit: "required",
        offset: "required",
    };
    
    let error_msg = {
        required: ":attribute cannot be null",
        // in: "invalid :attribute",
    };
    let validation = new Validator({ order, sort, limit, offset }, rules, error_msg);
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
            let sql = `SELECT * FROM todos
            ORDER BY ${order} ${sort}
            LIMIT ${limit}
            OFFSET ${offset}
            `
            let sqlCount = `SELECT COUNT(id) AS total FROM todos`
            db.query(sql, function (err, result) {
                if (err) throw err;
                db.query(sqlCount, function (err, resultCount) {
                    if (err) throw err;
                    let total = resultCount[0].total
                    res.json({
                        code: 200,
                        status: 'success',
                        message: ['success get data'],
                        result,
                        total
                    })
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

exports.delete = async (req, res, next) => {
    let { id } = req.body
    let rules = {
        id: "required|numeric",
    };
    
    let error_msg = {
        required: ":attribute cannot be null",
        in: "invalid :attribute",
    };
    let validation = new Validator({ id }, rules, error_msg);
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
            let sql = `DELETE FROM todos
            WHERE id = ${req.body.id}`
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.json({
                    code: 200,
                    status: 'success',
                    message: ['success delete data'],
                    result
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

exports.updateDone = async (req, res, next) => {
    let { id } = req.body
    let rules = {
        id: "required|numeric",
    };
    
    let error_msg = {
        required: ":attribute cannot be null",
        in: "invalid :attribute",
    };
    let validation = new Validator({ id }, rules, error_msg);
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
            let sql = `UPDATE TODOS
            set status = true
            WHERE id=${id}`
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.json({
                    code: 200,
                    status: 'success',
                    message: ['success update data'],
                    result
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

exports.edit = async (req, res, next) => {
    let { detail } = req.body
    let rules = {
        detail: "required",
    };
    
    let error_msg = {
        required: ":attribute cannot be null",
        in: "invalid :attribute",
    };
    let validation = new Validator({ detail }, rules, error_msg);
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
            let sql = `UPDATE todos
            set detail = '${req.body.detail}'
            WHERE id=${req.body.id}`
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.json({
                    code: 200,
                    status: 'success',
                    message: ['success update data'],
                    result
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
