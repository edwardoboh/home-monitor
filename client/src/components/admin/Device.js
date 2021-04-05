import React, {Component} from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    Badge
} from 'reactstrap'
import {connect} from 'react-redux'
import { getDevices, getDistance, addDevice } from '../../actions/deviceActions'

class Device extends Component {
    constructor(props){
        super()
        this.state = {
                device: {
        
                },
                distance: {
        
                },
                deviceName: "",
                deviceId: "",
                modal: false
            }
    }

    componentDidMount(){
        // get Device states and set state here
        this.props.getDevices()
        // this.props.getDistance()
    }

    refreshData = () => {
        this.props.getDevices()
        this.props.getDistance()
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal})
    }

    deviceInput = (event) => {
        this.setState({...this.state, [event.target.name] : event.target.value })
    }

    updateDevice = () => {
        const deviceDetails = {
            deviceName: this.state.deviceName,
            deviceId: this.state.deviceId
        }

        this.props.addDevice(deviceDetails)
    }

    render(){
        const {devicePositions} = this.props.devices
        // console.log(this.props)
        // const {deviceName, deviceId, address, accelerometer, shock, lastUpdate} = devicePositions[0].properties
        // const {coordinates} = devicePositions[0].geometry
        // const {accX, accY, accZ} = JSON.parse(accelerometer)
        return(
            <div className="container" style={{marginTop: "2rem"}}>
                <Button onClick={this.toggleModal} color="dark" block style={{marginBottom:"1.5rem"}}>Edit Device</Button>
                {/*  */}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Hospital</ModalHeader>
                    <ModalBody>
                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="deviceName">Device Name</Label>
                                <Input type="name" name="deviceName" id="deviceName" placeholder="Enter a new name for Device" onChange={this.deviceInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="deviceId">Device ID</Label>
                                <Input type="name" name="deviceId" id="deviceId" placeholder="Enter an ID" onChange={this.deviceInput} />
                            </FormGroup>
                            <Button onClick={this.updateDevice} color="dark" block>Save</Button>
                        </Form>
                    </div>
                    </ModalBody>
                </Modal>
                {/*  */}
                {
                    devicePositions.map(device => {
                        // console.log(this.props)
                        const {deviceName, deviceId, address, shock, accelerometer, lastUpdate} = device.properties
                        const {coordinates} = device.geometry
                        const {latitude, longitude, accX, accY, accZ} = this.props.devLoc 
                        // const {accX, accY, accZ} = JSON.parse(accelerometer)
                            return(
                                <div key={device.properties.id}>
                                    <Card md="10" xs="6" sm="8">
                                        {/* <CardImg top width="" src="/dev3.jpg" alt="Card image cap" /> */}
                                        <img width="10%" src="/dev3.jpg" alt="device" />
                                        <CardBody>
                                            <CardTitle tag="h5">Name: {`${deviceName}`}</CardTitle>
                                            <CardSubtitle tag="h7" className="mb-2 text-muted">ID: {`${deviceId}`}</CardSubtitle><br />
                                            Shock State: <Badge pill>{`${shock ? "TRUE" : "FALSE"}`}</Badge><br />
                                            Address: <Badge pill>{`${address}`}</Badge><br />
                                            {/* Latitude: <Badge color="secondary" pill>{`${coordinates[0]}`}</Badge><br />
                                            Longitude: <Badge pill>{`${coordinates[1]}`}</Badge><br /> */}
                                            Latitude: <Badge color="secondary" pill>{`${latitude}`}</Badge><br />
                                            Longitude: <Badge pill>{`${longitude}`}</Badge><br />
                                            Accelerometer::   X: <Badge pill>{`${accX}`}</Badge>   Y: <Badge pill>{`${accY}`}</Badge>   Z: <Badge pill>{`${accZ}`}</Badge><br />
                                            Last Update: <Badge pill>{`${lastUpdate}`}</Badge><br /><br />
                                            <Button color="dark" onClick={this.refreshData}>Refresh</Button>
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    devices: state.devices,
    hospitals: state.hospitals
})

export default connect(mapStateToProps, {getDevices, getDistance, addDevice})(Device)