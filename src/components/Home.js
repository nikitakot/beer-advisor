import React from 'react';
import Map from './Map';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { fetchBarsList } from '../actions/BarActions';
import { Text } from 'react-native';

class Home extends React.Component {
    static navigationOptions = {
        title: 'BeerAdvisor',
    };

    componentWillMount() {
        this.props.fetchBarsList();
    }

    renderMarkers() {
        const { barList } = this.props;
        return barList.map((bar, k) => (<MapView.Marker
                key={k}
                coordinate={{ latitude: bar.lat, longitude: bar.lng }}
                onCalloutPress={() => this.props.navigation.navigate('Bar', { bar })}
        >
                <MapView.Callout>
                    <Text>{bar.name}</Text>
                </MapView.Callout>
            </MapView.Marker>)
        );
    }

    render() {
        return (
            <Map
                zoomUser
                style={{ flex: 1 }}
            >
                {this.renderMarkers()}
            </Map>
        );
    }
}

const mapStateToProps = ({ barList }) => barList;

export default connect(mapStateToProps, { fetchBarsList })(Home);

