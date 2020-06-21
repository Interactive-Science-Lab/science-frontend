import React from 'react'

//export const apiPath = `http://localhost:4001/api` 
export const apiPathLink = `https://interactivelabscience.herokuapp.com/api` 

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
export const siteOptions = {
    displayFooter: true
}

export const menuOptions = {
    /* Whether or not to show the Site Pages ("About Us") on the menu */
    showPages: true,
    /* You may use page categories to organize your pages in the menu. False will put all the pages in the bar.*/
    usePageCategories: true,
    /* 
    Add page categories here and set them in the field.

    Attributes: 
    "name"- string; what is shown
    "symbol"- string; the fontawesome name
    "view"- permissions; can be "all", "logged_in", "no_user", "end_user", or "admin"
    */
    pageCategories: [
        {name: 'Help', symbol: 'exclamation', view: 'all'}
    ],
    
    /* Whether or not to show the Blog Content ("News", "Updates") on the menu */
    showBlogs: false,
    /* Used for separating different types of blog content. True puts them all in a dropdown, false, puts them in the menu.*/
    blogContentDropdown: true,
    /* If the above is true, all of the content is put into this dropdown object */
    blogDropdownObject: { name: "Content", view: "all", symbol: "box" },
    /* 
    Attributes
    displayName- string; what is shown on the link
    categoryName- string; what is stored in the database
    symbol- string; fontawesome name

    Set them here & set the correct IN the component file
    */
    blogContentTypes: [
        {displayName: "News & Updates", categoryName: "News", symbol: "newspaper", view: "all"},
        {displayName: "Blog Posts", categoryName: "Blogs", symbol: "comments", view: "all"},
    ],

    showComponents: true,
    componentCategories: [
        {id: 1, name: "Lab Settings", symbol: "newspaper", view: "admin", order: 2},
        {id: 2, name: "Support", symbol: "newspaper", view: "all", order: 1},
        {id: 3, name: "Admin", symbol: "newspaper", view: "admin", order: 3}
    ]

}