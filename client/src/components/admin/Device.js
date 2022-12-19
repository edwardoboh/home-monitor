import React, {Component} from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Table,
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
// Socket IO import
import socket from '../socket'

class Device extends Component {
    constructor(props){
        super(props)
        this.state = {
            device: {
            },
            distance: {
            },
            deviceName: "",
            deviceId: "",
            modal: false,
            devLoc: props.devLoc,
        }
        console.log("Client: Has connected to server socket")
        socket.on("updateAgain", (sensorData) => {
            props.getDevices()
            props.getDevices()
            // console.log("Socket Update Again")
        })
    }
    
    componentDidMount(){
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
        console.log(this.state.devLoc)
        return(
            <div className="container" style={{marginTop: "2rem"}}>
                <Button onClick={this.toggleModal} color="dark" block style={{marginBottom:"1.5rem"}}>Edit Device</Button>
                {/*  */}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Update Device Settings</ModalHeader>
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
                        const {deviceName, deviceId, address, accX, accY, accZ, latitude, longitude, lastUpdate, shock} = device
                        // const {latitude, longitude, accX, accY, accZ, shock} = this.props.devLoc 
                            return(
                                <div key={device.id}>
                                    <Card md="10" xs="6" sm="8">
                                        {/* <CardImg top width="" src="/dev3.jpg" alt="Card image cap" /> */}
                                        {/* <img width="10%" src="/dev3.jpg" alt="device" /> */}
                                        <CardBody>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <th><CardTitle tag="h5">Name</CardTitle></th><th><CardTitle>{`${deviceName}`}</CardTitle></th>
                                                    </tr>
                                                    <tr>
                                                        <th><CardSubtitle tag="h7" className="mb-2 text-muted">ID</CardSubtitle></th><th><CardSubtitle>{`${deviceId}`}</CardSubtitle></th>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Shock State</td> <td><Badge pill color={shock ? "danger": "primary"}>{`${shock ? "TRUE" : "FALSE"}`}</Badge></td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Address</td> <td><Badge pill>{`${address}`}</Badge></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Latitude</td> <td><Badge color="secondary" pill>{`${latitude}`}</Badge></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Longitude</td> <td> <Badge pill>{`${longitude}`}</Badge></td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Accelerometer</td> <td> X: <Badge pill>{`${accX}`}</Badge>   Y: <Badge pill>{`${accY}`}</Badge>   Z: <Badge pill>{`${accZ}`}</Badge></td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Last Update</td> <td><Badge pill>{`${lastUpdate}`}</Badge><br /></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Button color="warning" onClick={this.refreshData}><b>Refresh</b></Button>
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