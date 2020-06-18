import React from 'react'

export const siteTitle = "Science Lab"
export const logoURL = "/images/cpslogo.png"
export const siteTagline = "Online, Interactive Experiments"

export const loadingSpinner = <div>Loading.........</div>
export const permissionError = <div>Sorry, you do not have permissions to view this page.</div>
export const noResultsError = <div>Sorry, there was no results returned for that search.</div>
export const missingError = <div>Sorry, that page seems to be missing.</div>


 


/* ----------------------------

MENU OPTIONS 

----------------------------- */
export const menuOptions = {
    /* Whether or not to show the Site Pages ("About Us") on the menu */
    showPages: false,
    /* You may use page categories to organize your pages in the menu. False will put all the pages in the bar.*/
    usePageCategories: false,
    /* Attributes: 
    "name"- string; what is shown
    "symbol"- string; the fontawesome name
    "view"- permissions; can be "all", "logged_in", "no_user", "end_user", or "admin"
    */
    pageCategories: [
        {name: 'About', symbol: 'exclamation', view: 'all'}
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
    */
    blogContentTypes: [
        {displayName: "News & Updates", categoryName: "News", symbol: "newspaper", view: "all"},
        //{displayName: "Blog Posts", categoryName: "Blogs", symbol: "comments", view: "all"},
    ],

}