import React from 'react';
import { MapView } from 'expo';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
    }

    componentWillReceiveProps(nextProps) {
        const { lat, lng } = nextProps;
        if (this.mapRef && lat && lng) {
            this.mapRef.fitToCoordinates(
                [{
                    latitude: lat,
                    longitude: lng
                }]
            );
        }
    }

    render() {
        const { style, children } = this.props;

        return (
            <MapView
                style={style}
                showsUserLocation
                ref={(ref) => {
                    this.mapRef = ref;
                }}
            >
                {children}
            </MapView>
        );
    }
}
