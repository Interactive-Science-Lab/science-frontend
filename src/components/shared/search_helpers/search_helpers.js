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
    console.log(retParams)
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
    component.setState({ 
        ...object,
        loader: {
            ...component.state.loader, 
            pager: res.data.pager, 
            params,
            loading: false
        } 
    })
}

export const checkLoad = (component, pState) => {
    const differentPages = component.state.loader.params.toString() !== new URLSearchParams(window.location.search).toString()
    const changingUpdate = pState.loader.update !== component.state.loader.update

    if (component.state.loader.update || (differentPages && !changingUpdate)) {
        component.loadPage()
    }
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

