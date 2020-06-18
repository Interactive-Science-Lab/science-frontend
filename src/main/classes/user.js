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
        validations: ['unique', 'required'],
        permissions: {
            all: {name: 'self'}
        }
    },
    password: {
        default: '',
        fieldType: 'string',
        validations: ['required'],
        permissions: {
            all: { name: "none" },
            edit: { name: "self" },
            new: {name: "all"}
        }
    },
    ban_notes: {
        default: '',
        fieldType: 'text',
        permissions: {
            all: { name: "mod"}
        }
    },
    mailing_list: {
        default: false,
        fieldType: 'boolean',
        permissions: {
            all: {name: 'self'}
        }
    },
    user_role: {
        default: 1,
        fieldType: 'number',
        permissions: {
            edit: {name: 'admin'},
            new: {name: 'none'}
        },
    },
    user_kind: {
        permissions: {
            edit: {name: 'none'},
            new: {name: 'none'}
        },
        fieldType: 'string'
    },
    user_verified: {
        fieldType: 'hidden'
    },
    last_login_attempt: {
        fieldType: 'hidden'
    },
    login_attempts: {
        fieldType: 'hidden'
    },
    forgotten_password_reset_time: {
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