import React from 'react';
import { MapView } from 'expo';

export default class Map extends React.Component {

    // state = {
    //     showButton: false
    // };
    //
    // componentWillMount() {
    //     setTimeout(() => {
    //         this.setState({ showButton: true });
    //     }, 500);
    // }
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
        const { style, renderMarkers } = this.props;

        return (
            <MapView
                style={style}
                showsUserLocation
                ref={(ref) => {
                    this.mapRef = ref;
                }}
                //showsMyLocationButton={this.state.showButton}
            >
                {renderMarkers ? renderMarkers() : null}
            </MapView>
        );
    }
}
