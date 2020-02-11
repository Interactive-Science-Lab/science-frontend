import React from 'react'
import {NavLink} from 'react-router-dom'
import {curr_user} from 'helpers/api'

const displayLink = (item) => {
    if (item.link) { return item.link }
    else if (item.linkTo) {
        switch (item.linkTo) {
            case 'user_profile':
                return `/users/${curr_user?.user_id}`
        }
    }
}

const MenuLink = (props) => {
    const item = props.item
    return <NavLink className="hmenu-item" to={displayLink(item)}> 

    <span>{item.name}</span> <span className={`fas fa-${item.symbol}`}></span>
    
    </NavLink>
}

export default MenuLink