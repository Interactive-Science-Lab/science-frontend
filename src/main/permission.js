

/* 

Common Permission Settings-

Content- Mod edit, all view
Submit- All submit, mod view
Admin- Only admin can see and edit
Secret- completely hidden at all times
NoIndex- don't show on the index

*/ 

export class PermissionSetting {
    constructor(string) {
        this.permissionObject = {}
        this.setPermissions(string)
    }

    setPermissions = (string) => {
        switch(string) {
            case "content":
                this.setPermission('display', 'all')
                this.setPermission('form', 'mod')
                break;
            case "submit":
                this.setPermission('all', 'mod')
                this.setPermission('new', 'all')
                break;
            case 'logged_in':
                this.setPermission('all', 'logged_in')
                break;
            case "admin":
                this.setPermission('all', 'admin')
                break;
            case "secret":
                this.setPermission('all', 'none')
                break;
            case "noIndex":
                this.setPermission('index', 'none')
        }
        
    }

    setPermission = (view, phrase) => {
        this.permissionObject[view] = new Permission(phrase)
    }
}

/* 
    ==Options==
    'all'
    'logged_in'
    'no_user'
    'none'
    'webmaster'
    'admin'
    'mod'
    'self'
*/

export class Permission {
    constructor(name) {
        this.rules = {
            name: name,
            role: "",
            kind: "",
            join: "",
            custom: ""
        }
    }


}