import React from 'react'

export default (props) => {
  switch(props.formClass) {
    case "pantheons_history":
      if(props.item.history){
        const records = props.item.history
        return {
          default_item: {
            influenced_id: props.item.pantheon_id,
            influencer_id: 0, 
            history_type: "Direct",
          },
          records: records.map(item => ({
            update_id: item.pantheon_history_id,
            record: {
              id: item.pantheon_history_id,
              influencer_id: item.influencer_id,
              history_type: item.history_type || "",
              original_record: item
            }
          })),
          title: "History",
          url: "pantheons/histories"
        }
      } else {
        return []
      }
      break;
    case "pantheons_influenced":
      if(props.item.influenced){
        const records = props.item.influenced
        return {
          default_item: { influencer_id: props.item.pantheon_id, influenced_id: 0, history_type: "Direct", },
          records: records.map(item => ({
            update_id: item.pantheon_history_id,
            record: {
              id: item.pantheon_history_id,
              influenced_id: item.influenced_id,
              history_type: item.history_type || "",
              original_record: item
            }
          })),
          title: "Influenced", 
          url: "pantheons/histories"
        }
      } else {
        return []
      }
      break;

    case "pantheons_use_kinds":
      if(props.item.history){
        const records = props.item.uses_kinds
        return {
          default_item: {
            kp_pantheon_id: props.item.pantheon_id,
            kp_kind_id: 0
          },
          records: records.map(item => ({
            update_id: item.kinds_to_pantheons_id,
            record: {
              id: item.kinds_to_pantheons_id,
              kp_kind_id: item.kp_kind_id,
              original_record: item
            }
          })),
          title: "Kinds Used",
          url: "kinds/pantheons"
        }
      } else {
        return []
      }
      break;

    case "kinds_used_by_pantheons":
      if(props.item.pantheons){
        const records = props.item.pantheons
        return {
          default_item: {
            kp_kind_id: props.item.kind_id,
            kp_pantheon_id: 0
          },
          records: records.map(item => ({
            update_id: item.kinds_to_pantheons_id,
            record: {
              id: item.kinds_to_pantheons_id,
              kp_pantheon_id: item.kp_pantheon_id,
              original_record: item
            }
          })),
          title: "Pantheons Using",
          url: "kinds/pantheons"
        }
      } else {
        return []
      }
      break;

    case "kinds_in_categories":
      if(props.item.kinds){
        const records = props.item.kinds
        return {
          default_item: {
            ck_category_id: props.item.category_id,
            ck_kind_id: 0
          },
          records: records.map(item => ({
            update_id: item.category_kind_id,
            record: {
              id: item.category_kind_id,
              ck_kind_id: item.ck_kind_id,
              original_record: item
            }
          })),
          title: "Contains",
          url: "categories/kinds"
        }
      } else {
        return []
      }
      break;

    case "category_pantheons":
      if(props.item.pantheons){
        const records = props.item.pantheons
        return {
          default_item: {
            cpa_category_id: props.item.category_id,
            cpa_pantheon_id: 0
          },
          records: records.map(item => ({
            update_id: item.category_pantheon_id,
            record: {
              id: item.category_pantheon_id,
              cpa_pantheon_id: item.cpa_pantheon_id,
              original_record: item
            }
          })),
          title: "Pantheons",
          url: "categories/pantheons"
        }
      } else {
        return []
      }
      break;

    case "category_symbols":
      if(props.item.symbols){
        const records = props.item.symbols
        return {
          default_item: {
            cs_category_id: props.item.category_id,
            cs_symbol_id: 0
          },
          records: records.map(item => ({
            update_id: item.category_symbol_id,
            record: {
              id: item.category_symbol_id,
              cs_symbol_id: item.cs_symbol_id,
              original_record: item
            }
          })),
          title: "Symbols",
          url: "categories/symbols"
        }
      } else {
        return []
      }
      break;

    case "category_prereqs":
      if(props.item.prerequisites){
        const records = props.item.prerequisites
        return {
          default_item: {
            cp_category_id: props.item.category_id,
            cp_prereq_id: 0
          },
          records: records.map(item => ({
            update_id: item.category_prereq_id,
            record: {
              id: item.category_prereq_id,
              cp_prereq_id: item.cp_prereq_id,
              original_record: item
            }
          })),
          title: "Prerequisites",
          url: "categories/prerequisites"
        }
      } else {
        return []
      }
      break;

    case "symbol_connections":
      if(props.item.connections){
        const records = props.item.connections
        return {
          default_item: {
            main_symbol_id: props.item.symbol_id,
            connected_symbol_id: 0,
            connection_description: "",
            connection_strength: 0,
            connection_relationship: 0
          },
          records: records.map(item => ({
            update_id: item.symbol_connection_id,
            record: {
              id: item.symbol_connection_id,
              connected_symbol_id: item.connected_symbol_id,
              connection_description: item.connection_description || "",
              connection_strength: item.connection_strength || 0,
              connection_relationship: item.connection_relationship || 0,
              original_record: item
            }
          })),
          title: "Connections",
          url: "symbols/connections"
        }
      } else {
        return []
      }
      break;

    case "symbol_pantheons":
      if(props.item.pantheons){
        const records = props.item.pantheons
        return {
          default_item: {
            sp_symbol_id: props.item.symbol_id,
            sp_pantheon_id: 0
          },
          records: records.map(item => ({
            update_id: item.symbol_pantheon_id,
            record: {
              id: item.symbol_pantheon_id,
              sp_pantheon_id: item.sp_pantheon_id,
              original_record: item
            }
          })),
          title: "Uses This Symbol",
          url: "symbols/pantheons"
        }
      } else {
        return []
      }
      break;

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
      if(props.item.thumbnail){
        const records = props.item.thumbnail
        return {
          default_item: {
            foreign_id: props.info.id,
            foreign_class: props.info.class,
            thumbnail: true,
            image_url: "",
            image_title: "",
            image_description: ""
          },
          records: [{
            update_id: records.image_id,
            record: {
              id: records.image_id,
              image_url: records.image_url,
              image_title: records.image_title,
              image_description: records.image_description
            }
          }],
          title: "Thumbnail (Main Image)",
          url: "images"
        }
      } else {
        return []
      }
      break;

    case "sources":
      if(props.item.sources){
        const records = props.item.sources
        return {
          default_item: {
            foreign_key: props.info.id,
            foreign_class: props.info.class,
            source_link: "",
            source_title: "",
            source_article_title: "",
            source_description: ""
          },
          records: records.map(item => ({
            update_id: item.source_id,
            record: {
              id: item.source_id,
              source_link: item.source_link,
              source_title: item.source_title,
              source_article_title: item.source_article_title,
              source_description: item.source_description,
            }
          })),
          title: "Sources",
          url: "sources"
        }
      } else {
        return []
      }
      break;

    case "kind_symbol_connections":
      if(props.item.kindSymbolConnections){
        const records = props.item.kindSymbolConnections
        return {
          default_item: {
            ksc_kind_id: props.item.kind_id,
            ksc_symbol_id: 0
          },
          records: records.map(item => ({
            update_id: item.kind_symbol_connection_id,
            record: {
              id: item.kind_symbol_connection_id,
              ksc_symbol_id: item.ksc_symbol_id,
              original_record: item
            }
          })),
          title: "Same/Relative To",
          url: "kinds/symbolConnections"
        }
      } else {
        return []
      }
      break;

    case "kind_info_kinds":
      if(props.item.kindInfoKinds){
        const records = props.item.kindInfoKinds
        return {
          default_item: {
            kik_kind_id: props.item.kind_id,
            kik_connected_info_id: 0
          },
          records: records.map(item => ({
            update_id: item.kind_info_kind_id,
            record: {
              id: item.kind_info_kind_id,
              kik_connected_info_id: item.kik_connected_info_id,
              original_record: item
            }
          })),
          title: "Show Connections on Page",
          url: "kinds/infoKinds"
        }
      } else {
        return []
      }
      break;

      case "symbol_resources":
          if(props.item.resources){
            const records = props.item.resources
            return {
              default_item: {
                sr_symbol_id: props.item.symbol_id,
                sr_resource_id: 0,
                sr_description: ""
              },
              records: records.map(item => ({
                update_id: item.symbol_resource_id,
                record: {
                  id: item.symbol_resource_id,
                  sr_resource_id: item.sr_resource_id,
                  sr_description: item.sr_description,
                  original_record: item
                }
              })),
              title: "External Resources for More Information",
              url: "symbols/resources"
            }
          } else {
            return []
          }
          break;
    
    


    }
  }
