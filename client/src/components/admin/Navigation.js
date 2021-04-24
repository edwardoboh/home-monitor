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

function Navigation(){

  useEffect(() => {
    socket = io(ENDPOINT)
    console.log("Client: Has connected to server socket")
    socket.on("update", (sensorData, callback) => {
      const {latitude, longitude, accelerometer} = sensorData
      updateSensorData(sensorData)
      // callback("Response Gotten")
    })
  },[ENDPOINT])


  const updateSensorData = ({latitude, longitude, accelerometer}) => {
    accelerometer = JSON.parse(accelerometer)
    const {accX, accY, accZ} = accelerometer
    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)
    setDeviceLocation({latitude, longitude, accX, accY, accZ})
  }

  const [deviceLocation, setDeviceLocation] = useState({latitude: 6.393265751333534, longitude: 5.619564868102384, accX: 0, accY: 0, accZ: 0})

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
              <Map devLoc={deviceLocation}/>
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
            <Hospital />
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Navigation;