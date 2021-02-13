// import React, { useState } from 'react'

// function CompTest(){
//     const [objState, setObjState] = useState({
//         name: "",
//         email: "",
//         password: ""
//     })

//     const handleChange = (event) => {
//         setObjState({...objState, [event.target.name]: event.target.value})
//     }

//     const submitForm = (e) => {
//         e.preventDefault()
//         console.log(objState)
//     }

//     return(
//         <div>
//             <form onSubmit={submitForm}>
//                 <label>Name</label>
//                 <input type="text" name="name" onChange={handleChange}/>
//                 <label>Email</label>
//                 <input type="text" name="email" onChange={handleChange} />
//                 <label>Password</label>
//                 <input type="password" name="password" onChange={handleChange} />
//                 <input type="submit" value="Submit" />
//             </form>
//         </div>
//     )
// }
// export default CompTest

import React, { Component } from 'react'

class CompTest extends Component{
    state = {
        user: {
            name: "",
            email: "",
            password: ""
        },
        admin: "EDWARD OBOH"
    }

    handleChange = (event) => {
        this.setState({user: {...this.state.user, [event.target.name]: event.target.value}})
    }

    submitForm = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    handleBind = (valueT, event) => {
        console.log(valueT)
        console.log(event.target.name)
    }

    render(){

        return(
            <div>
                <form onSubmit={this.submitForm}>
                    <label>Name</label>
                    <input type="text" name="name" onChange={this.handleChange}/>
                    <label>Email</label>
                    <input type="text" name="email" onChange={this.handleChange} />
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange} />
                    <label>Bind Test</label>
                    <input type="text" name="text" onChange={this.handleBind.bind(this, "mango")} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default CompTest