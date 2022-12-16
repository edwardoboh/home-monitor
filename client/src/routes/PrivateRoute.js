import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
    const {children, ...rest} = props
    const isAuth = localStorage.getItem("isAuthenticated")

    return(
        <Route
            {...rest}
            render = { () => {
                return isAuth === "true" ? children : <Redirect to="/login" />
            }}
        />
    )
}

export default PrivateRoute