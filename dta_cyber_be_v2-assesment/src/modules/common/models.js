const {Model} = require("sequelize");
const {dbClient,conString} = require("../../config");

/**
 * Base model class used across the application.
 */
class BaseModel extends Model {
}


// Defines default options. Used in Model.init().
const defaultOptions = {
    sequelize: dbClient,
    timestamps: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at'
}


// Defines default attributes. Used in Model.init().
const defaultAttributes = {}


module.exports = {
    BaseModel,
    defaultOptions,
    defaultAttributes,
    
}
