//Menu Structure

//Array of objects
//Top level items can be dropdown or link
//Second level items must be a link
//View- is a string which sets permissions
//link- is the direct path
//linkTo- dynamic linking set in topMenu.js
//links- sets the dropdown


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false


export default  [
    {name: "Visit The Lab", view: "logged_in", symbol: "star", link: "/lab"}, 
    
    
    {name: "Contact", view: "all", link: '/feedback/new', symbol: "comment-slash"},
    {name: "Sign Up / Login", view: "no_user", symbol: "user", links: [
        {name: "Register", view: "all", link: '/auth/register', symbol: ""},
        {name: "Login", view: "all", link: '/auth/login', symbol: ""},
        {name: "Forgot My Password", view: "all", link: '/auth/forgottenPassword', symbol: ""},
    ]}, 
    {name: "Logout", view: 'logged_in', link: '/auth/logout', symbol: "sign-out-alt"},
    // {name: "Account", view: "logged_in", symbol: "user", links: [   
    //     {name: "Logout", view: 'logged_in', link: '/auth/logout', symbol: "sign-out-alt"}
    // ]},
    // {name: "Help", view: "all", symbol: "info-circle", links: [
    //     {name: "Support/Bug Report", view: "all", link: '/support_tickets/new', symbol: "bug"},
    // ]},
    {name: "Site Settings", view: "admin", symbol: "user-cog", links: [   
        {name: "User List", view: 'admin', link: '/users', symbol: "users"},
        {name: "Feedback", view: 'admin', link: '/feedback', symbol: "comments"},
        //{name: "Page List", view: 'admin', link: '/pages', symbol: "cogs"},
        //{name: "Support Tickets", view: 'admin', link: '/support_tickets', symbol: "comments"},
    ]},
    {name: "Lab Settings", view: "admin", symbol: "tools", links: [   
        {name: "Experiments", view: 'admin', link: '/experiments', symbol: "microscope"},
        {name: "Containers", view: 'admin', link: '/containers', symbol: "flask"},
        {name: "Objects", view: 'admin', link: '/objects', symbol: "magnet"},
        {name: "Substances", view: 'admin', link: '/substances', symbol: "atom"},
    ]},
]
