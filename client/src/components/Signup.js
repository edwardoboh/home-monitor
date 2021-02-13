import React, { Component } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Row
} from 'reactstrap'

class Signup extends Component {
    
    state = {
        hospital: {
            hospitalName: "",
            address: "",
            email: "",
            password: "",
            latitude: "",
            longitude: "",
            phonePrimary: "",
            phoneSecondary: "",
            ambulanceService: "",
            numOfAmbulance: "",
        },
        driver: {
            fullName: "",
            phone: "",
            deviceId: "",
            address: "",
            email: "",
            password: "",
            NOK_name: "",
            NOK_phone: "",
            NOK_address: "",
        },
        userType: "hospital"
    }

    setUserType = (event) => {
        this.setState({userType: event.target.value})
    }

    hospitalInput = (event) => {
        this.setState({hospital : {...this.state.hospital, [event.target.name] : event.target.value}})
    }

    driverInput = (event) => {
        this.setState({driver : {...this.state.driver, [event.target.name] : event.target.value}})
    }

    submitForm = () => {
        
    }

    render(){
        return(
            <Form className="container">
                <FormGroup>
                    <Label for="userType">User Type</Label>
                    <Input type="select" name="userType" id="userType" onChange={this.setUserType} >
                        <option value="hospital" default>Hospital</option>
                        <option value="driver">Driver</option>
                    </Input>
                </FormGroup>
                <hr></hr>
            {   this.state.userType === "hospital" ?
                <div>
                    <FormGroup>
                        <Label for="name">Hospital Name</Label>
                        <Input type="name" name="hospitalName" id="hospitalName" placeholder="Enter name of hospital" onChange={this.hospitalInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter email address" onChange={this.hospitalInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter password" onChange={this.hospitalInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" placeholder="Enter address" onChange={this.hospitalInput} />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="latitude">Latitude</Label>
                                <Input type="number" name="latitude" id="latitude" onChange={this.hospitalInput} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="longitude">Longitude</Label>
                                <Input type="number" name="longitude" id="longitude" onChange={this.hospitalInput} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="phonePrimary">Phone 1</Label>
                                <Input type="tel" name="phonePrimary" id="phonePrimary" placeholder="Enter Modile Phone" onChange={this.hospitalInput} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="phoneSecondary">Phone 2</Label>
                                <Input type="tel" name="phoneSecondary" id="phoneSecondary" placeholder="Enter Office Phone" onChange={this.hospitalInput} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="numOfAmbulance">No. of Ambulance</Label>
                        <Input type="select" name="numOfAmbulance" id="numOfAmbulance" onChange={this.hospitalInput} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </Input>
                    </FormGroup>
                </div>
                
                :

                <div>
                    <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Input type="name" name="fullName" id="fullName" placeholder="Enter Full Name" onChange={this.driverInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter email Address" onChange={this.driverInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter password" onChange={this.driverInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" placeholder="Enter Address" onChange={this.driverInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input type="tel" name="phone" id="phone" placeholder="Enter Mobile Number" onChange={this.driverInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="deviceId">Device ID</Label>
                        <Input type="text" name="deviceId" id="deviceId" placeholder="Enter Device ID" onChange={this.driverInput} />
                    </FormGroup>
                </div>
            }
                <Button onClick={this.submitForm} color="primary">Signup</Button>
            </Form>
        )
    }
}

export default Signup