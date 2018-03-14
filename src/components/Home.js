import React from 'react';
import Map from './Map';

class Home extends React.Component {
    static navigationOptions = {
        title: 'BeerAdvisor',
    };

    render() {
        return (
            <Map />
        );
    }
}

export default Home;

