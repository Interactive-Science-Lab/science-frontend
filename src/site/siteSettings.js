import React from 'react'

export const siteOptions = {
    backendLive: true,
    displayFooter: true
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
        {name: "Visit The Lab", permission:  "logged_in", symbol: "star", link: "/lab", order: 1},
        {name: "Experiments", permission:  "admin", symbol: "user", order: 2, link: '/experiments'},
        {name: "Login", permission:  "no_user", symbol: "user", order: 1, link: '/auth/login'},
        {name: "Logout", permission:  'logged_in', link: '/auth/logout', symbol: "sign-out-alt", order: 5},
    ],
    menuCategories: [
        /*{name: "Help and Support", symbol: "newspaper", permission:  "all", order: 2},
        {name: "Lab Settings", symbol: "newspaper", permission:  "admin", order: 3},
        {name: "Admin", symbol: "newspaper", permission:  "admin", order: 4}*/
    ]

}