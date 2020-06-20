/* 
This is the file that holds the Menu Structure, all pages besides Site Pages and Site Blogs.
The information in here determines what is shown on the menu, for components.

Default export is an Array of objects, each object containing information about the nature of that link.

Top level items can be dropdown or link
Currently, second level items *must* be a link


Attributes:
{ name, view, symbol, [link options] }
Name- string; what is shown as the link text
View- string; sets permissions for who can see the link
    options include  "all", "logged_in", "no_user", "end_user", and "admin"
Symbol- string; the fontawesome symbol name to show

Link options-
link- string; is the direct path to a page
links- nested array of items that sets the dropdown links
linkTo- dynamic linking stored in ./menuLink.js

Raw Object for single link
{name: "", view: "", symbol: "", link: ""}

Raw Object for dropdown item
{name: "", view: "", symbol: "", links: [
    {name: "", view: "", symbol: "", link: ""},
    {name: "", view: "", symbol: "", link: ""},
    {name: "", view: "", symbol: "", link: ""}
]}


*/

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
]

 // {name: "Account", view: "logged_in", symbol: "user", links: [   
//     {name: "Logout", view: 'logged_in', link: '/auth/logout', symbol: "sign-out-alt"}
// ]},
// {name: "Help", view: "all", symbol: "info-circle", links: [
//     {name: "Support/Bug Report", view: "all", link: '/support_tickets/new', symbol: "bug"},
// ]},


// {name: "Lab Settings", view: "admin", symbol: "tools", links: [   
//     {name: "Experiments", view: 'admin', link: '/experiments', symbol: "microscope"},
//     {name: "Containers", view: 'admin', link: '/containers', symbol: "flask"},
//     {name: "Objects", view: 'admin', link: '/objects', symbol: "magnet"},
//     {name: "Substances", view: 'admin', link: '/substances', symbol: "atom"},
//     {name: "Tools", view: 'admin', link: '/tools', symbol: "atom"},
// ]},