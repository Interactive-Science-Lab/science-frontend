=====================
Science Lab Frontend
---------------------

Folder Structure
=====================
/public
|- /images - all the images for the app
|- /sounds - all the sound effts
|- science soundtrack.mp3 - the 5 or 6 songs spliced together into one song to play for music

/src
|-  /helpers/api.js - the helper for getting the logged in user & calling the backend api
|-  /lab - the files for the lab front end
    |-  /classes - code regarding behavior of the frond end, including the drag & drop items & general info.
    |-  /components - the UI components for the lab.
        |-  /animations - code regarding the physics animations
        |-  /labLayout - the acutal layout of the lab
        |-  core.js - the main code/component for the lab
        |-  item.js - the component for the drag & drop items 
    |-  labContext.js - holds information to pass down through the lab components
|-  /portal - code regarding the UI of the admin portal.
|-  /site - settings for the app
    |- home.js - the component for the home page.
    |- siteSettings- a file to quickly & easily change sitewide variables like API links and titles/fonts
|-  /structure - files relating to the layout of the app (menu, footer, etc.)
|-  /stylesheets
|-  App.js - component regarding App state
|-  index.js - the react wrapper

