import Site from '../main/asteroid/site'

/* 
ASTEROID STANDARD SITE COMPONENTS 
*/
/* SitePages are simply additional HTML pages on to a site. "About Us", etc. */
import site_page from './componentFiles/site_page'
/* SiteBlogs are any content that the website is putting out, for "News", "Updates", whatever fits.*/
import site_blog from './componentFiles/site_blog'
/* Feedback is a simple form for somebody to simply write in. Mark read/unread.*/
import feedback from './componentFiles/feedback'
/* SupportTickets are more in-depth help that can be marked open / closed & with notes. */
import support_ticket from './componentFiles/support_ticket'


import user from './componentFiles/user'
import admin_user from './componentFiles/admin_user'
import end_user from './componentFiles/end_user'
import log from './componentFiles/user_logs'
import thumbnail from './componentFiles/thumbnail'

/* CUSTOM COMPONENTS */
import experiment from './componentFiles/experiment'
import container from './componentFiles/container'
import substance from './componentFiles/substance'
import object_item from './componentFiles/object_item'
import tool from './componentFiles/tool'


import resource from './componentFiles/resource'
import resourceField from './componentFiles/resource_field'


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

site.addComponent(resource)
site.addComponent(resourceField)


export default site