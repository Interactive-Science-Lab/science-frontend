const base = 'user';

const permissions = {
    index: {name: 'mod'},
    view: {name: 'all'},
    create: {name: 'all'},
    edit: {name: 'self'},
    delete: {name: 'self'}
};

const features = {
    filter: {
        options: ['all', '1', '2', '3'],
        protection: 'admin'
    },
    search: {},
    paginate: {},
    thumbnail: {},
    user_info: {}
};

const fields = {
    username: {
        default: '',
        fieldType: 'string',
        validations: ['unique', 'required']
    },
    user_email: {
        default: '',
        fieldType: 'string',
        validations: ['unique', 'required']
    },
    password: {
        default: '',
        fieldType: 'string',
        validations: ['required'],
        permissions: ['self', 'hidden']
    },
    ban_notes: {
        default: '',
        fieldType: 'text',
        permissions: ['mod']
    },
    mailing_list: {
        default: false,
        fieldType: 'boolean',
        permissions: ['list-hidden']
    },
    user_role: {
        default: 1,
        fieldType: 'number',
        permissions: ['default', 'edit-admin']
    },
    user_kind: {
        permissions: ['static', 'auto'],
        fieldType: 'string'
    },
    user_verified: {
        permissions: ['static', 'default'],
        fieldType: 'hidden'
    },
    last_login_attempt: {
        permissions: ['background'],
        fieldType: 'hidden'
    },
    login_attempts: {
        permissions: ['background'],
        fieldType: 'hidden'
    },
    forgotten_password_reset_time: {
        permissions: ['background'],
        fieldType: 'hidden'
    }
};

const plural = base + 's';
const upper = base.charAt(0).toUpperCase() + base.substring(1);
const pluralUpper = upper + 's';

const loader = {};

export default {
    name: {
        lp: plural,
        ls: base,
        up: pluralUpper,
        us: upper,
        friendly: plural,
        urlPath: '/' + plural,
        folderPath: '/' + plural,
        title: {
            index: 'All ' + pluralUpper,
            view: upper + ' Details',
            new: 'Add ' + upper,
            edit: 'Edit ' + upper
        }
    },
    permissions,
    features,
    loader,
    idField: base + '_id',
    uniqueText: base + '_name',
    fields,
    display: {}
};