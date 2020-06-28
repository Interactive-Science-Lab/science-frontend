import React from 'react'
import Component from '../../main/asteroid/componentClass/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('site_blog', {friendly: 'posts', upper: 'BlogPosts'}) 

let noIndex = new PermissionSetting('noIndex')
let hidden = new PermissionSetting('hidden')
let mod = new PermissionSetting('mod')

component.addFeature('search')
component.addFeature('paginate')

component.addFeature('filter', ['draft', 'public', 'private', 'asdf'])
component.addFeature('sort', [['blog_title', 'Alphabetical'], ['created_at', 'Post Date']])
//permissions: staticField, 
component.addReference('author_id', 'author_username', 'select', {title: "Author"})

let thumb = component.addReference('image_id', 'thumbnail', 'control', {title: "Thumbnail Image", resourceName: 'thumbnails'})

let imageDisplay = (item) => { return <img src={item.image_url} alt="" /> }
thumb.setCustomDisplay('display', imageDisplay)

component.addTags('blog_tags', {})



component.setLoader({ sort: "created_at", sortdir: "DESC", filter: "public" })

const back_to_all_link = (item) => { return `/posts?category=${item.blog_category}` }
component.addOption('back_to_all_link', back_to_all_link)

component.addField('blog_status', {default: "draft", fieldType: ["select-draft"], permissions: mod})
component.addField('blog_category', {default: "Blog", permissions: hidden, fieldType: ["select-custom", [['Blog', "Blog"], ["News", "News"]]],})
component.addField('blog_title', {validations: ["required", "unique"],titleField: true})
component.addField('blog_description', {validations: ["required"],})
component.addField('blog_text', {fieldType: 'html', validations: ["required"], permissions: noIndex})

export default component