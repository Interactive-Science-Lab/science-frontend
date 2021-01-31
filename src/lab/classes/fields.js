import {siteOptions} from '../../site/siteSettings'

export const labKindHelper = (props) => {
    let labKind = siteOptions.demoSite ? "demo" : "chemistry"
    let params = props.location.search?.substr(1).split("&") || []

    params.map((p) => {
        let pair = p.split('=')
        if (pair[0] === 'l') { labKind = pair[1] }
    })

    return labKind
}

export default {
    chemistry: {
        backgroundImage: "background-chem.png"
    },
    biology: {
        backgroundImage: "background-bio.png"
    },
    physics: {
        backgroundImage: "background-phys.png"
    },
    demo: {
        backgroundImage: "background-phys.png"
    }
}

