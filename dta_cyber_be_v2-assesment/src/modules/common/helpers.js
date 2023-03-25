/**
 * Central function to send out the ok/success response.
 */
const apiOkResponse = (res, data = {}) => {
    console.log("api response called")
    res.json(200, {
        data,
        is_success: true,
        action: "DO_NOTHING"
    })
}


/**
 * Central function to send out the error response.
 */
const apiErrorResponse = (res, data = {}, code = 400) => {
    res.json(code, {
        data,
        is_success: false,
        action: "DISPLAY_ERROR"
    })
}


// returns if the value belongs to the null family
const isNull = (value) => [null, undefined, NaN].includes(value)


// returns the value of key from any object
const getAttr = (object, key, fallback = null) => key in object ? object[key] : fallback


// checks if the passed Array or Object(dict) is empty
const isEmpty = (object) => {

    // null case
    if (isNull(object)) {
        return true
    }

    // not an array => get keys in dict (i.e) convert to list/Array
    if (!Array.isArray(object)) {
        object = Object.keys(object)
    }

    // check if array has values or not
    return object.length === 0
}


/**
 * Given an object or dict with unnecessary keys and given the necessary keys.
 * This function will return an object or dict with only the necessary keys.
 *
 * Used to filter out the necessary request data from req.body.
 */
const pick = (object, keys, fallback = null) => {
    let pickedObject = {}

    for (let key of keys) {
        pickedObject[key] = getAttr(object, key, fallback)
    }

    return pickedObject
}


module.exports = {
    apiOkResponse,
    apiErrorResponse,
    isNull,
    getAttr,
    isEmpty,
    pick
}
