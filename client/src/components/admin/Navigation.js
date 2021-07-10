import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  NavbarText,
  Row,
  Col
} from 'reactstrap';

import classnames from 'classnames'
import Map from './Map';
import Hospital from './Hospitals';
import Device from './Device';

// Socket IO import
import io from 'socket.io-client'
let socket;
const ENDPOINT = '/'

// MAP API KEYS
// const api_key = "AIzaSyDNXkOCTcRTz9itRiFN9N8CziIEL9eLc5w"
const api_key = "AIzaSyC2gvpIAVI9BzKmiPR4rwmLHv68Q91P0bE"
let minID;
function Navigation(){

  useEffect(() => {
    socket = io(ENDPOINT)
    console.log("Client: Has connected to server socket")
    socket.on("update", (sensorData, callback) => {
      const {latitude, longitude, accelerometer, shock} = sensorData
      updateSensorData(sensorData)
      // callback("Response Gotten")
    })
    socket.on("matrix", (matrixData) => {
      setMatrixDataState([...matrixData])
      minID = minDistanceHospital(matrixData)
      console.log("minID: ", minID)
      console.log("MATRIX RECEIVED IN CLIENT: ", matrixData)
    })
  },[ENDPOINT])

  // Calculate to get hospital with minimum distance
  const minDistanceHospital = (matDat) => {
    let minDist = 2000000
    let minId
    matDat.forEach(mat => {
      if(mat.distance.distance.value < minDist){
        minDist = mat.distance.distance.value
        minId = mat.hospital._id
      }
    })
    return minId
  }


  const updateSensorData = ({latitude, longitude, accelerometer, shock}) => {
    accelerometer = JSON.parse(accelerometer)
    const {accX, accY, accZ} = accelerometer
    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)
    setDeviceLocation({latitude, longitude, accX, accY, accZ, shock})
  }

  const [deviceLocation, setDeviceLocation] = useState({latitude: 6.393265751333534, longitude: 5.619564868102384, accX: 0, accY: 0, accZ: 0, shock: false})

  const [matrixDataState, setMatrixDataState] = useState([])

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [activeTab, setActiveTab] = useState('1');
  const toggleTab = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">AutoCrash</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/" onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    <Navbar color="light" light expand="md">
        <Nav tabs>
        <NavItem>
            <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggleTab('1'); }}
            >
                Map
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggleTab('2'); }}
            >
                Device
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggleTab('3'); }}
            >
                Hospitals
            </NavLink>
        </NavItem>
    </Nav>
    </Navbar>

    <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Map devLoc={deviceLocation} api_key={api_key}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Device devLoc={deviceLocation}/>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Hospital devLoc={deviceLocation} api_key={api_key} matrix={matrixDataState} minId={minID}/>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Navigation;