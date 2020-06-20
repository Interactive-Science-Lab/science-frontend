import React from 'react'

import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('site_blog', {friendly: 'posts', upper: 'BlogPosts'}) 

let noIndex = new PermissionSetting('noIndex')
let hidden = new PermissionSetting('hidden')
let mod = new PermissionSetting('mod')

component.turnOnFeature('search')
component.turnOnFeature('paginate')
component.turnOnFeature('thumbnail')
component.turnOnFeature('filter')
component.setFilterOptions(['draft', 'public', 'private'])
component.setLoader({ sort: "created_at", sortdir: "DESC" })

component.turnOnFeature('sort')
component.addSortOption('blog_title', 'Alphabetical')
component.addSortOption('created_at', 'Post Date')

component.turnOnFeature('tags')
component.setFieldOption('tags', 'blog_tags')

const back_to_all_link = (item) => {
    return `/posts?category=${item.blog_category}`
}

component.addOption('back_to_all_link', back_to_all_link)

component.addMenuOption({name: "BlogPosts", view: 'admin', symbol: 'heart', order: 0})

component.addField('blog_status', {default: "draft", fieldType: ["select-draft"], permissions: mod})
component.addField('blog_category', {default: "Blog", permissions: hidden, fieldType: ["select-custom", [['Blog', "Blog"], ["News", "News"]]],})
component.addField('blog_title', {validations: ["required", "unique"],titleField: true})
component.addField('blog_description', {validations: ["required"],})
component.addField('blog_text', {fieldType: 'html', validations: ["required"], permissions: noIndex})

export default component

// const features = {
//     user: [{
//         field: "author_id",
//         name: "Author",
//         permissions: ["static"]
//     }]
// }