export const defaultLoader = (def = {}) => {
    const params = new URLSearchParams(window.location.search)
    //Set incoming defaults to the params
    Object.entries(def).map(incomingDefault => params.set(incomingDefault[0], incomingDefault[1]))
    let retParams = {
        ...def,
        params,
        update: true,
        loading: false,
        pager: {},
    }

    //Set the default if set already
    const options = ['search', 'filter', 'sort', 'sortdir', 'tag']
    options.map(o => params.get(o) ? retParams[o] = params.get(o) : "")
    window.history.replaceState({}, "", window.location.pathname + '?' + params.toString()) 
    return retParams
}

export const checkParams = (component) => {
    let params = component.state.loader.params
    if (params.toString() !== new URLSearchParams(window.location.search)) {
         params = new URLSearchParams(window.location.search)
    }

    if (component.state.loader.update) { component.setState({ loader: {...component.state.loader, update: false, loading: true }}) }

    return params
}

export const updatePage = (component, res, params, object) => {
    const loader = {
        ...component.state.loader, 
        params,
        loading: false
    } 
    if(component.context.paginate) { loader.pager = res?.data?.pager || null }

    component.setState({ 
        ...object,
        loader
    })
}

export const checkLoad = (component, pState, pProps) => {
    const differentPages = component.state.loader.params.toString() !== new URLSearchParams(window.location.search).toString()
    const changingUpdate = pState.loader.update !== component.state.loader.update
    const changeComponent = !(component.props.match.params.urlPath === pProps.match.params.urlPath)

    const ret = component.state.loader.update || (differentPages && !changingUpdate) || changeComponent
    return ret
        
    
}

export const handleParameter = (component, param, value) => {
    let loader = component.state.loader
    let {params} = loader
    params.set(param, value)

    component.setState({ loader: {
            ...loader,
            [param]: value,
            params, 
            update:true,
    }})
    
    window.history.replaceState({}, "", window.location.pathname + '?' + params.toString())  
}

