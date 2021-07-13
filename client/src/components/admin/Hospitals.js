import React, {Component} from 'react'
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Row
} from 'reactstrap'

import {connect} from 'react-redux'

import {addHospital, getHospitals} from '../../actions/hospitalActions'

// import axios from 'axios'
class Hospital extends Component {
    constructor(props){
        super(props)
        this.state = {
            newHospital: {
                hospitalName: "",
                address: "",
                email: "",
                latitude: null,
                longitude: null,
                phonePrimary: "",
                phoneSecondary: "",
                numOfAmbulance: "",
            },
            modal: false,
            search: null,
            matrix: [...props.matrix]
        }
    }

    componentDidMount(){
        // function to get all hospitals
        this.props.getHospitals()
        // this.hospitalDistance()
    }

/**
    // Format the url
    formatUrl = (url, origins, destinations) => {
        const {api_key} = this.props
        let newUrl = `${url}&origins=${origins.latitude},${origins.longitude}&destinations=`
        for (let i = 0; i <= destinations.length - 1; i++){
            if(i == destinations.length - 1){
                newUrl = `${newUrl}${destinations[i].geometry.coordinates[0]}%2C${destinations[i].geometry.coordinates[1]}&key=${api_key}`
                break;
            }
            newUrl = `${newUrl}${destinations[i].geometry.coordinates[0]}%2C${destinations[i].geometry.coordinates[1]}%7C`
        }
        return newUrl;
    }

    // Function to calculate disstance from device to all hospitals
    hospitalDistance = () => {
        const originLoc = this.props.devLoc
        let allHospitals = this.props.hospitals.hospitalPositions
        // console.log("Device Location: ", originLoc)
        // console.log("All Hospitals: ", allHospitals)
        let hospitalsWithDistance = []
        let gUrl = this.formatUrl("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial", 
        originLoc, allHospitals)
        console.log("New Before Axios Request")
        // axios.get(gUrl, {headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        //   }}).then((resp) => {
        const headers = { 'Content-Type': 'application/json', 'mode': 'no-cors'}
        fetch(gUrl, { headers })
            .then(response => response.json())
            .then(data => {
                console.log("Axios Request")
                let hosDistance = data.rows[0].elements
                hospitalsWithDistance = allHospitals.map((hospital, index) => {
                    return {hospital, distance: hosDistance[index]}
                })
            })

        console.log(hospitalsWithDistance)
    }

*/
    // Action to create new hospital
    newHospital = () => {
        const newHospital = {
            properties: {
                hospitalName: this.state.newHospital.hospitalName,
                address: this.state.newHospital.address,
                email: this.state.newHospital.email,
                phonePrimary: this.state.newHospital.phonePrimary,
                phoneSecondary: this.state.newHospital.phoneSecondary,
                numOfAmbulance: this.state.newHospital.numOfAmbulance,
            },
            geometry: {
                coordinates: [Number(this.state.newHospital.longitude), Number(this.state.newHospital.latitude)]
            }
        }
        console.log(newHospital)
        this.props.addHospital(newHospital)

        // Check to see if add was successful and then call toggle
        this.toggleModal()
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal})
    }

    hospitalInput = (event) => {
        this.setState({...this.state, newHospital : {...this.state.newHospital, [event.target.name] : event.target.value}})
    }

    searchByName = (event) => {
        this.setState({...this.state, [event.target.name] : event.target.value})
    }

    myDistance = (myId) => {
        if(this.props.matrix.length < 1){
            return 0
        }
        let mDistance = this.props.matrix.filter(matrix => {
            if(matrix.hospital._id == myId){
                return true
            }
        });
        return mDistance[0].distance.distance.text
        // console.log("nDistance",mDistance[0].distance.distance.text)
    }

    callColor = (myId) => {
        if(this.props.matrix.length < 1){
            return {color:"blue"}
        }
        let dist;
        if(myId == this.props.minId){
            dist = {color:"green"}
        }else{
            dist = {color:"red"}
        }
        return dist
        // return mColor[0].distance.distance.text
    }

    render(){

        const {hospitalPositions} = this.props.hospitals
        // console.log("this.props.matrix: ", this.props.matrix)

        return(
            <div className="container">
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Hospital</ModalHeader>
                    <ModalBody>
                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="name">Hospital Name</Label>
                                <Input type="name" name="hospitalName" id="hospitalName" placeholder="Enter name of hospital" onChange={this.hospitalInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Enter email address" onChange={this.hospitalInput} />
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
                            <Button onClick={this.newHospital} color="dark" block>Add Hospital</Button>
                        </Form>
                    </div>
                    </ModalBody>
                </Modal>
                <Button onClick={this.toggleModal} color="dark" block style={{marginBottom:"1.5rem"}}>Create</Button>
                <hr />
                <Input type="text" name="search" placeholder="Search Hospital by name" onChange={this.searchByName} />
                <br />
                <ListGroup>
                    {
                        hospitalPositions.filter(hospital => {
                            if(this.state.search == null){
                                return hospital
                            }else if(hospital.properties.hospitalName.toLowerCase().includes(this.state.search.toLowerCase())){
                                return hospital
                            }
                        })
                        .map((hospital, hIndex) =>
                            <div key={hospital.properties.id}>
                                <ListGroupItem>
                                    <ListGroupItemHeading>{hospital.properties.hospitalName}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                        {hospital.properties.address}<br />
                                        Phone: {hospital.properties.phonePrimary}   |   Email: {hospital.properties.email}<br />
                                        Ambulance Vehicles: {hospital.properties.numOfAmbulance}<br />
                                        Latitude: {hospital.geometry.coordinates[0]} | Longitude: {hospital.geometry.coordinates[1]}
                                    </ListGroupItemText>
                                    <hr />
                                    <ListGroupItemText style={this.callColor(hospital.properties.id)}>
                                        <strong>
                                            Distance: {this.myDistance(hospital.properties.id)}
                                        </strong>
                                    </ListGroupItemText>
                                </ListGroupItem>
                                <br />
                            </div> 
                        )
                    }
                </ListGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    hospitals: state.hospitals
})

export default connect(mapStateToProps, {addHospital, getHospitals})(Hospital)