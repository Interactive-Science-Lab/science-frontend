import ComponentField from './componentField'
/* These are for connecting two things */
//Thumbnail, userReference

//('author_id', 'Author', {})

//Will need a select / show / target field

//Types of references
//SELECT - select from a list of created- AUTHOR- goes into form as simple select field
//CONTROL - add/edit as a parent- THUMBNAIL- adds forms AFTER form
//


export default class ComponentReference extends ComponentField {
    constructor(idField, targetField, referenceType, options) {
        super(idField, { ...options, fieldType: 'reference' })
        //which field the info is stored in on the parent- should likely be an foriegn id field
        this.idField = idField
        //the field that's displayed and chosen / selected - either a name, title, img, whatever
        this.targetField =  targetField
        this.referenceType = referenceType



    }


}