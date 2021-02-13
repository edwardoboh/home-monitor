import React, { useState } from 'react';
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

function Navigation(){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [activeTab, setActiveTab] = useState('1');
  const toggleTab = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">AutoCrash</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavbarText>Welcome</NavbarText>
            <NavItem>
              <NavLink href="/">Logout</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
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
              <Map />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Device />
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