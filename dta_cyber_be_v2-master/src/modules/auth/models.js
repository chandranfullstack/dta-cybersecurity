const {BaseModel, defaultOptions, defaultAttributes} = require("../common/models");
const {DataTypes} = require("sequelize");


/**
 * User model across the application. Handles auth related stuff.
 */
class User extends BaseModel {
}

User.init(
    {
        ...defaultAttributes,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    },
    defaultOptions
);


module.exports = {
    User
}