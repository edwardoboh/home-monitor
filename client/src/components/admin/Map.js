import React, {Component} from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps'
import AutoComplete from 'react-google-autocomplete'

import {connect} from 'react-redux'

import {getHospitals} from '../../actions/hospitalActions'
import {getDevices} from '../../actions/deviceActions'
import mapStyles from './mapStyles'

// import * as deviceData from './data/deviceData.json'
// import * as hospitalData from './data/hospitalData.json'

let CrashMap;

class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            zoom: 14,
            address: "",
            state: "",
            city: "",
            street: "",
            mapPosition: {lat: 6.331745043250994, lng: 5.623306914417808},
            markerPosition: {
                lat: "",
                lng: ""
            },
            // deviceCenter = {lat: 6.331745043250994, lng: 5.623306914417808}
            // hospitalPositions: hospitalData,
            // devicePositions: deviceData
        }
    }

    componentDidMount(){
        // get all hospitals and device location and set it to state
        this.props.getHospitals()
        this.props.getDevices()

        // Set the state to center the map
    }

    toSelectedLocation = (place) => {
        this.setState({mapPosition: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}})
    }

    render(){
        // Device Location from Socket
        let {latitude, longitude} = this.props.devLoc
        
        const {hospitalPositions} = this.props.hospitals
        const {devicePositions} = this.props.devices
        // const deviceCenter = {lat: devicePositions[0].geometry.coordinates[0], lng: devicePositions[0].geometry.coordinates[1]}
        
        const deviceCenter = {lat: latitude, lng: longitude}
        const {api_key} = this.props
        CrashMap = withScriptjs(withGoogleMap(() => {
            return(
            <GoogleMap
                defaultZoom={this.state.zoom}
                // defaultCenter={this.state.mapPosition}
                defaultCenter={deviceCenter}
                defaultOptions={{styles: mapStyles}}
            >
                {hospitalPositions && hospitalPositions.map((mark) => 
                <Marker
                    key={mark.properties.id}
                    position={{lat: mark.geometry.coordinates[0], lng: mark.geometry.coordinates[1]}}
                    label="H"
                >
                </Marker>
                )}
                    
                {devicePositions && devicePositions.map((mark) => 
                        <Marker
                            key={mark.id}
                            // position={{lat: mark.geometry.coordinates[0], lng: mark.geometry.coordinates[1]}}
                            position={{lat: (latitude ? latitude : mark.latitude), lng: (longitude ? longitude : mark.longitude)}}
                            // label="D"
                            icon={{
                                url: `/car2.svg`,
                                scaledSize: new window.google.maps.Size(40, 40)
                            }}
                        >
                        </Marker>
                    )
                }
            <AutoComplete 
                style={{width: "100%", marginTop: "1rem"}}
                type={['(regions)']}
                onPlaceSelected={this.toSelectedLocation}
                componentRestrictions={{country: "ng"}}
            />
            </GoogleMap>
            )
        }))
        return(
            <div className="" style={{marginLeft: "1.5rem", marginTop: "1rem"}}>
                <CrashMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${api_key}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{height: "100%"}} />}
                    containerElement={<div style={{height: "65vh", width: "95vw"}} />}
                    mapElement={<div style={{height: "100%"}} />}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    hospitals: state.hospitals,
    devices: state.devices
})

export default connect(mapStateToProps, {getHospitals, getDevices})(Map);