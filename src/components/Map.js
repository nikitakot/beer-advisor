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

    render() {
        const { style, renderMarkers } = this.props;

        return (
            <MapView
                style={style}
                showsUserLocation
                //showsMyLocationButton={this.state.showButton}
            >
                {renderMarkers ? renderMarkers() : null}
            </MapView>
        );
    }
}
