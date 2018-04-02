import React from 'react';
import { MapView } from 'expo';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = { focusUser: props.zoomUser };
    }

    componentDidMount() {
        if (this.props.zoomUser) {
            setTimeout(() => {
                this.setState({ focusUser: false });
            }, 5000);
        }
        const { lat, lng } = this.props;
        this.fitToCoordinates(lat, lng);
    }

    componentWillReceiveProps(nextProps) {
        const { lat, lng } = nextProps;
        if (lat !== this.props.lat || lng !== this.props.lng) {
            this.fitToCoordinates(lat, lng);
        }
    }

    fitToCoordinates(lat, lng) {
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
