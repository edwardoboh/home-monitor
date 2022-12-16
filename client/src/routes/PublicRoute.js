import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = (props) => {
    const {children, ...rest} = props
    const isAuth = localStorage.getItem("isAuthenticated")

    return(
        <Route
            {...rest}
            render = { () => {
                return isAuth === "true" ? <Redirect to="/dashboard" /> : children
            }}
         />
    )
}

export default PublicRoute