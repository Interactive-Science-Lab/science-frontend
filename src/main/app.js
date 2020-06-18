import Site from './site'

import user from './classes/user'
import site_page from './classes/site_page'
import site_blog from './classes/site_blog'
import support_ticket from './classes/support_ticket'
import feedback from './classes/feedback'
import log from './classes/user_logs'
import admin_user from './classes/admin_user'
import end_user from './classes/end_user'
import thumbnail from './classes/thumbnail'

import experiment from './classes/experiment'
import container from './classes/container'
import substance from './classes/substance'
import object_item from './classes/object_item'
import tool from './classes/tool'


let site = new Site()

site.addComponent(user)
site.addComponent(site_page)
site.addComponent(site_blog)
site.addComponent(support_ticket)
site.addComponent(feedback)
site.addComponent(log)
site.addComponent(admin_user)
site.addComponent(end_user)
site.addComponent(thumbnail)
site.addComponent(object_item)
site.addComponent(experiment)
site.addComponent(container)
site.addComponent(substance)
site.addComponent(tool)

export default site