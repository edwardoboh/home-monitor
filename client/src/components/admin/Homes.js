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

import { addHome, deleteHome, getHomes } from '../../actions/homeActions'

// import axios from 'axios'
class Homes extends Component {
    constructor(props){
        super(props)
        this.state = {
            newHome: {
                address: "",
                email: "",
                latitude: null,
                longitude: null,
                phone: "",
                name: "",
            },
            modal: false,
            search: null,
            matrix: [...props.matrix]
        }
    }

    componentDidMount(){
        // function to get all hospitals
        this.props.getHomes()
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
    newHome = () => {
        const newHome = {
            properties: {
                name: this.state.newHome.name,
                address: this.state.newHome.address,
                email: this.state.newHome.email,
                phone: this.state.newHome.phonePrimary,
            },
            geometry: {
                coordinates: [Number(this.state.newHome.longitude), Number(this.state.newHome.latitude)]
            }
        }
        console.log(newHome)
        this.props.addHome(newHome)

        // Check to see if add was successful and then call toggle
        this.toggleModal()
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal})
    }

    homeInput = (event) => {
        this.setState({...this.state, newHome : {...this.state.newHome, [event.target.name] : event.target.value}})
    }

    searchByName = (event) => {
        this.setState({...this.state, [event.target.name] : event.target.value})
    }

    myDistance = (myId) => {
        if(this.props.matrix.length < 1){
            return 0
        }
        let mDistance = this.props.matrix.filter(matrix => {
            if(matrix.home._id == myId){
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

        const {homePositions} = this.props.homes
        // console.log("this.props.matrix: ", this.props.matrix)

        return(
            <div className="container">
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Your Home</ModalHeader>
                    <ModalBody>
                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Enter email address" onChange={this.homeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input type="text" name="address" id="address" placeholder="Enter address" onChange={this.homeInput} />
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="latitude">Latitude</Label>
                                        <Input type="number" name="latitude" id="latitude" onChange={this.homeInput} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="longitude">Longitude</Label>
                                        <Input type="number" name="longitude" id="longitude" onChange={this.homeInput} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phonePrimary">Phone</Label>
                                        <Input type="tel" name="phone" id="phone" placeholder="Enter Modile Phone" onChange={this.homeInput} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button onClick={this.newHome} color="dark" block>Add Home</Button>
                        </Form>
                    </div>
                    </ModalBody>
                </Modal>
                <Button
                    onClick={this.toggleModal}
                    className="mt-4"
                    color="dark"
                    block
                    style={{marginBottom:"1.5rem"}}
                >
                    Create
                </Button>
                <hr />
                <br />
                <ListGroup>
                    {
                        homePositions.filter(home => {
                            if(this.state.search == null){
                                return home
                            }else if(home.properties.homeName.toLowerCase().includes(this.state.search.toLowerCase())){
                                return home
                            }
                        })
                        .map((home, hIndex) =>
                            <div key={home.properties.id}>
                                <ListGroupItem>
                                    <ListGroupItemText>
                                        {home.properties.address}<br />
                                        Phone: {home.properties.phonePrimary}   |   Email: {home.properties.email}<br />
                                        Latitude: {home.geometry.coordinates[0]} | Longitude: {home.geometry.coordinates[1]}
                                    </ListGroupItemText>
                                    <hr />
                                    <ListGroupItemText style={this.callColor(home.properties.id)}>
                                        <strong>
                                            Distance: {this.myDistance(home.properties.id)}
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
    homes: state.homes
})

export default connect(mapStateToProps, {addHome, getHomes})(Homes)