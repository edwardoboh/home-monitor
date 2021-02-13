import React, { useState } from 'react'
import {
    Jumbotron,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap'

import Login from './Login'
import Signup from './Signup'

function Welcome () {

    const [loginModal, setLoginModal] = useState(false)
    const toggleLogin = () => setLoginModal(!loginModal)

    const [signupModal, setSignupModal] = useState(false)
    const toggleSignup = () => setSignupModal(!signupModal)

    return(
        <div>
            <Modal isOpen={loginModal} toggle={toggleLogin}>
                <ModalHeader toggle={toggleLogin} title>Login</ModalHeader>
                <ModalBody>
                    <Login />
                </ModalBody>
            </Modal>
            <Modal isOpen={signupModal} toggle={toggleSignup}>
                <ModalHeader toggle={toggleSignup} title>Signup</ModalHeader>
                <ModalBody>
                    <Signup />
                </ModalBody>
            </Modal>
            <Container>
            <Jumbotron style={{margin:"auto", width:"80%", marginTop:"5rem"}}>
                <h1 className="display-3">Auto Crash</h1>
                <p className="lead">Auto Crash App to monitor activities of connected endpoints</p>
                <hr className="my-2" />
                {/* <p>Click below to either signup or login</p> */}
                <p className="lead">
                <Button color="danger" onClick={toggleLogin} style={{marginRight:"1rem"}}>Login</Button>
                <Button color="primary" onClick={toggleSignup} >Signup</Button>
                </p>
            </Jumbotron>
            </Container>
        </div>
    )
}

export default Welcome