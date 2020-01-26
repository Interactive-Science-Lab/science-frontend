import React from 'react'
import {findResourceSettings} from 'db/defaultObjects'

export default (props) => {
  let records = []
  const resourceSettings = findResourceSettings(props.formClass)
  console.log("rs in rc", resourceSettings, props.formClass)
  switch (props.formClass) {


    case "images":
      if (props.item.images) {
        records = props.item.images
        return {
          resourceSettings,
          default_item: {
            foreign_id: props.info.id,
            foreign_class: props.info.class,
            thumbnail: false,
            image_url: "",
            image_title: "",
            image_description: ""
          },
          records: records.map(item => ({
            update_id: item.image_id,
            record: {
              id: item.image_id,
              thumbnail: item.thumbnail,
              image_url: item.image_url,
              image_title: item.image_title,
              image_description: item.image_description
            }
          })),
          title: "Image Gallery",
          url: "images"
        }
      } else {
        return []
      }
      break;

    case "thumbnail":

      records = props.item.thumbnail ? [props.item.thumbnail] : []
      return {
        resourceSettings,
        default_item: {
          foreign_id: props.info.id,
          foreign_class: props.info.class,
          image_url: "",
          image_title: "",
          image_description: "",
          image_kind: 'thumbnail',
        },
        records: records.map(item => ({
          update_id: item.image_id,
          record: {
            id: item.image_id,
            image_url: item.image_url,
            image_title: item.image_title,
            image_description: item.image_description
          }
        })),
        title: "Thumbnail (Main Image)",
        url: "images"
      }
      break;



    case "admin_user":

      records = props.item.info ? [props.item.info] : []
      return {
        resourceSettings,
        default_item: {
          foreign_user_id: props.info.id,
          phone_number: "",
          public_email: "",
        },
        records: records.map(item => ({
          update_id: item.admin_user_id,
          record: {
            id: item.admin_user_id,
            phone_number: item.phone_number,
            public_email: item.public_email
          }
        })),
        title: "Admin User",
        url: "admin_users"
      }
      break;



    case "end_user":

      records = props.item.info ? [props.item.info] : []
      return {
        resourceSettings,
        default_item: {
          foreign_id: props.info.id,
          foreign_class: props.info.class,
          image_url: "",
          image_title: "",
          image_description: "",
          image_kind: 'thumbnail',
        },
        records: records.map(item => ({
          update_id: item.image_id,
          record: {
            id: item.image_id,
            image_url: item.image_url,
            image_title: item.image_title,
            image_description: item.image_description
          }
        })),
        title: "End User",
        url: "end_users"
      }
      break;



  }


}
