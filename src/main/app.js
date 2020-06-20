import Site from './site'


/* 
ASTEROID STANDARD SITE COMPONENTS 
*/
/* SitePages are simply additional HTML pages on to a site. "About Us", etc. */
import site_page from './classes/site_page'
/* SiteBlogs are any content that the website is putting out, for "News", "Updates", whatever fits.*/
import site_blog from './classes/site_blog'
/* Feedback is a simple form for somebody to simply write in. Mark read/unread.*/
import feedback from './classes/feedback'
/* SupportTickets are more in-depth help that can be marked open / closed & with notes. */
import support_ticket from './classes/support_ticket'


import user from './classes/user'
import admin_user from './classes/admin_user'
import end_user from './classes/end_user'
import log from './classes/user_logs'
import thumbnail from './classes/thumbnail'

/* CUSTOM COMPONENTS */
import experiment from './classes/experiment'
import container from './classes/container'
import substance from './classes/substance'
import object_item from './classes/object_item'
import tool from './classes/tool'


let site = new Site()
site.addComponent(user)
site.addComponent(log)
site.addComponent(admin_user)
site.addComponent(end_user)
site.addComponent(thumbnail)

site.addComponent(site_blog)
site.addComponent(site_page)
site.addComponent(feedback)
site.addComponent(support_ticket)
site.addComponent(object_item)
site.addComponent(experiment)
site.addComponent(container)
site.addComponent(substance)
site.addComponent(tool)

export default site