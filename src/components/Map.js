import React from 'react';
import { MapView } from 'expo';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = { focusUser: true };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ focusUser: false });
        }, 1000);
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
                minZoomLevel={8}
                maxZoomLevel={16}
                style={style}
                followsUserLocation={this.state.focusUser}
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
