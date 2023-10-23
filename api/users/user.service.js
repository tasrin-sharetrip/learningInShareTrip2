const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        // .query is a method, inside `` this we can write our query
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
                        values(?,?,?,?,?,?);`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
                // these are returning in controller
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id, firstname, lastName, gender, email, password, number from registration`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id, firstname, lastName, gender, email, password, number from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUsers: (data, callBack) => {
        pool.query(
            `update registration set firstname=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserMail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]); // if we don't use 0 here then we cant get results.password in user.controller{results will be array so results.password wont make sense}
            }
        );
    }
};