import React from 'react'

export const siteOptions = {
    backendLive: false,
    displayFooter: false
}

export const localBeLink = `http://localhost:4001/api` 
export const liveBeLink = `https://interactivelabscience.herokuapp.com/api` 
export const apiPathLink = siteOptions.backendLive ? liveBeLink : localBeLink

export const siteTitle = "Science Lab"
export const logoURL = "/images/cpslogo.png"
export const siteTagline = "Online, Interactive Experiments"

export const loadingSpinner = <div>Loading.........</div>
export const permissionError = <div>Sorry, you do not have permissions to view this page.</div>
export const noResultsError = <div>Sorry, there was no results returned for that search.</div>
export const missingError = <div>Sorry, that page seems to be missing.</div>

export const googleFonts = ['Open Sans', 'Signika', 'Bowlby One SC']
 


/* ----------------------------

MENU OPTIONS 

----------------------------- */


export const menuOptions = {
    menuPersist: false,
    menuOnHome: false,
    
    showComponents: true,
    /* Whether or not to show the Site Pages ("About Us") on the menu */
    showPages: true,
    /* Whether or not to show the Blog Content ("News", "Updates") on the menu */
    showBlogs: false,

    /* Used for separating different types of blog content. True puts them all in a dropdown, false, puts them in the menu.*/
    blogContentDropdown: true,
    /* If the above is true, all of the content is put into this dropdown object */
    blogDropdownObject: { name: "Content", permission:  "all", symbol: "box" },
    
    /* displayName- string; what is shown on the link - categoryName- string; what is stored in the database */
    blogContentTypes: [
        {displayName: "News & Updates", categoryName: "News", symbol: "newspaper", permission:  "all"},
        {displayName: "Blog Posts", categoryName: "Blogs", symbol: "comments", permission:  "all"},
    ],
    customMenuStructure: [
        {displayText: "Visit The Lab", permission_id:  7, symbol: "star", link: "/lab", order: 1},
        {displayText: "Experiments", permission_id:  4, symbol: "star", order: 2, link: '/experiments'},
        {displayText: "Objects", permission_id:  4, symbol: "star", order: 20, link: '/objects'},
        {displayText: "Tools", permission_id:  4, symbol: "star", order: 21, link: '/tools'},
        {displayText: "Containers", permission_id:  4, symbol: "star", order: 22, link: '/containers'},
        {displayText: "Substances", permission_id:  4, symbol: "star", order: 23, link: '/substances'},
        {displayText: "Drawers", permission_id:  4, symbol: "star", order: 24, link: '/drawers'},
        {displayText: "Login", permission_id:  6, symbol: "user", order: 1, link: '/auth/login'},
        {displayText: "Logout", permission_id:  7, link: '/auth/logout', symbol: "sign-out-alt", order: 3},
    ],
    menuCategories: [
        /*{name: "Help and Support", symbol: "newspaper", permission:  "all", order: 2},
        {name: "Lab Settings", symbol: "newspaper", permission:  "admin", order: 3},
        {name: "Admin", symbol: "newspaper", permission:  "admin", order: 4}*/
    ]

}