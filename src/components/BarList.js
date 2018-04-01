import React from 'react';
import { Button, Card, CardSection, Spinner } from './common';
import NavigationService from '../utlis/NavigationService';
import { ERROR_TEXT_STYLE } from '../utlis/constants';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import RatingItem from './RatingItem';

class BarList extends React.Component {
    static navigationOptions = {
        title: 'BarList',
    };

    componentWillMount() {
        // this.props.fetchBeerList();
    }

    renderList() {
        // const { onPress, getIcon } = this.props;
        // return this.props.beerList.map(beer =>
        //     <RatingItem
        //         onPress={() => onPress(beer)}
        //         icon={getIcon(beer)}
        //         key={beer.id}
        //         name={beer.name}
        //     />
        // );
    }

    render() {
        const { loading, error } = this.props;

        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Button
                            onPress={() => {
                                NavigationService.navigate('AddBar');
                            }}
                        >Add a new bar</Button>
                    </CardSection>
                    <Card>
                        {loading ? <Spinner /> : null}
                        {error ? <Text style={ERROR_TEXT_STYLE}>{error}</Text> : null}
                        {this.renderList()}
                    </Card>
                </Card>
            </ScrollView>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, {})(BarList);

