const printifyName = (name) => {
    return name
    .replace('container_', '')
    .replace('object_', '')
    .replace('experiment_', '')
    .replace('substance_', '')
    .replace('feedback_', '')
    .replace('user_', '')
    .replace(/_/g, ' ')
    .replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})
}

//CHECK FIELD FUNCTIONS
const checkBasicText = (pair) => {
    return valueIsType(pair, 'string') &&     
    fieldDoesNotContain(pair, ['_id',  '_text', '_url', 'foreign_class'] ) &&
    fieldIsNot(pair, ['id', 'blog_status', 'blog_category', 'page_status', 'page_category'])
}

const checkTextField = (pair) => {
    return pair[0] === 'notes' || fieldContains(pair, '_text')
}

const checkIdSelectField = (pair) => {
    return fieldContains(pair, '_id') && 
    fieldDoesNotContain(pair, ['foreign']) 
}

const checkArrayOptionsField = (pair) => {
    return valueIsType(pair, 'array') && 
    fieldDoesNotContain(pair, ['_id', ])
}

const checkBasicNumber = (pair) => {
    return valueIsType(pair, 'number') && 
    fieldDoesNotContain(pair, ['_id', 'foreign_key']) &&
    fieldIsNot(pair, ["id"])
}

export default {printifyName, checkBasicText, checkBasicNumber, checkTextField, checkIdSelectField, checkArrayOptionsField}

//PRIVATE METHODS

//CHECK/VALUE FUNCTIONS

//Checks to see if the value is a certain type.
const valueIsType = (pair, value) => {
    if(value === "array") {
        return Array.isArray(pair[1])
    } else if(value === "number") {
        return Number.isInteger(pair[1])
    } else {
        return typeof pair[1] === value 
    }
}

//Looks for an exact match
const fieldIs = (pair, value) => {
    return typeof pair[0] === value 
}

//Ignores an exact match- takes an array
const fieldIsNot = (pair, value) => {
    let ret = true
    value.forEach((item) => { if(pair[0] === item) { ret = false; } })
    return ret
}

//Looks for a partial string
const fieldContains = (pair, value) => {
    return pair[0].indexOf(value) > -1
}

//Ignores any partial strings- takes an array
const fieldDoesNotContain = (pair, value) => {
    let ret = true
    value.forEach((item) => { if(pair[0].indexOf(item) > -1) { ret = false; } })
    return ret
}