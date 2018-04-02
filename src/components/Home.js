import React from 'react';
import Map from './Map';

class Home extends React.Component {
    static navigationOptions = {
        title: 'BeerAdvisor',
    };

    render() {
        return (
            <Map
                zoomUser
                style={{ flex: 1 }}
            />
        );
    }
}

export default Home;

