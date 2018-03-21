import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import Map from './Map';
import AddBarButton from './AddBarButton';


class AddBarForm extends React.Component {
    static navigationOptions = {
        title: 'Add a bar',
    };

    render() {
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={60}
                behavior="padding"
            >
                <ScrollView>
                    <Card>
                        <CardSection>
                            <Input
                                label="Bar Name"
                                placeholder="Enter the bar name"
                            />
                        </CardSection>
                        <CardSection>
                            <Map style={{ height: 300, flex: 1, width: null }} />
                        </CardSection>
                        <CardSection>
                            <Input
                                label="Address"
                                placeholder="Enter the bar address"
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                label="Phone"
                                placeholder="Enter the bar phone number"
                            />
                        </CardSection>
                        <CardSection>
                            <AddBarButton />
                        </CardSection>
                        <CardSection>
                            <Button>
                                Add
                            </Button>
                        </CardSection>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default AddBarForm;

