import React from 'react'

export default (props) => {
  switch(props.formClass) {
    

    case "images":
      if(props.item.images){
        const records = props.item.images
        return {
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
      
        const records = props.item.thumbnail ?  [props.item.thumbnail] : []
        return {
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

    }
  }
