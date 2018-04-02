import React from 'react';
import Map from './Map';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { fetchBarsList } from '../actions/BarActions';

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
        />));
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

