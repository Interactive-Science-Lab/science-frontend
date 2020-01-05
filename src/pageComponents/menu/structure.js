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
    {name: "Sign Up", view: "no_user", symbol: "user", links: [
        {name: "Register", view: "all", link: '/users/register', symbol: ""},
        {name: "Login", view: "all", link: '/users/login', symbol: ""},
        {name: "Forgot My Password", view: "all", link: '/users/forgottenPassword', symbol: ""},
    ]}, 
    {name: "Messages", view: "end_user", link: '/messages', symbol: "comments"},
    {name: "Alerts", view: "end_user", link: '/alerts', symbol: "exclamation"},
    {name: "Athletes", view: "end_user", link: '/athletes', symbol: "running"},
    {name: "Visits", view: "end_user", link: '/visits', symbol: "calendar-alt"},
    {name: "Team and Staff", view: "end_user", link: `/teams/${curr_user && curr_user.userInfo ? curr_user.userInfo.team_id : ""}`, symbol: "users"},
    {name: "Dashboard", view: "end_user", link: '/users/dashboard', symbol: "user-circle"},
    {name: "Account", view: "logged_in", symbol: "user", links: [   
        {name: "User List", view: 'admin', link: '/admin/users', symbol: "users"},
        {name: "Logs", view: 'admin', link: '/admin/logs', symbol: "cogs"},
        {name: "Feedback", view: 'admin', link: '/feedback', symbol: "comments"},
        {name: "Support Tickets", view: 'admin', link: '/support_tickets', symbol: "comments"},
        {name: "Logout", view: 'all', link: '/users/logout', symbol: "sign-out-alt"}
    ]},
    {name: "Help", view: "all", symbol: "info-circle", links: [
        {name: "Feedback/Contact", view: "all", link: '/feedback/provide', symbol: "comments"},
        {name: "Support/Bug Report", view: "all", link: '/support_tickets/new', symbol: "bug"},
    ]},
]
