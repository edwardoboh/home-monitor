import React, {useState, useEffect} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
} from 'reactstrap';
import socket from '../socket';

function Logs() {
    const [deviceLogs, setDeviceLogs] = useState([]);
    const [deviceData, setDeviceData] = useState()

    useEffect(() => {
        socket.on('update', function(data){
            // if(data) setLocation({latitude: data.latitude, longitude: data.longitude});
            if(data && data.latitude) setDeviceData(data);
        })
    }, []);

    useEffect(() => {
        if(deviceData){
            const logMessage = addLog(deviceData.latitude, deviceData.longitude)
            setDeviceLogs([...deviceLogs.splice(-12), logMessage]);
        }
    }, [deviceData])

    const addLog = (latitude, longitude) => {
        return `[${new Date().toLocaleTimeString()}] Latitude: ${latitude} | Longitude: ${longitude}`;
    }

    return (
        <div className="container" style={{marginTop: "2rem"}}>
            <Card
                className="my-2 ms-4 mx-2"
                color="primary"
                outline
                style={{
                width: '100%',
                height: "70vh"
                }}
            >
                <CardHeader>
                Data Logs
                </CardHeader>
                <CardBody>
                <CardText
                    style={{"overflow-y": "scroll", "overflow": "hidden"}}
                >
                    {(deviceLogs.length > 0) && deviceLogs.map((logMessage, idx) => {
                        const colorClass = (idx % 3 === 0) ? "text-primary" : (idx % 2 === 0) ? "text-success" : "text-warning";
                        return (
                            <p
                            className={`mb-0 ${colorClass}`}
                            >
                                {logMessage}
                            </p>
                        )
                    })}
                </CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default Logs;