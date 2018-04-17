import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { Button, Card, CardSection, Spinner, TextArea } from './common';
import { APP_BLUE, ERROR_TEXT_STYLE, HEADER_STYLE, TEXT_STYLE } from '../utlis/constants';

class Comments extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Discussion ${navigation.state.params.sub.name}`
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            comment: '',
            comments: [],
            error: ''
        };
    }

    componentWillMount() {
        // this.props.getComments();
    }

    onPress() {
        const { comment } = this.state;
        if (!comment) {
            this.setState({ error: 'Please enter some text first' });
            return;
        }
        const { onPress } = this.props.navigation.state.params;
        this.setState({ loading: true });
        onPress(comment)
            .then(() => {
                // this.props.getComments()
                //     .then(comments => {
                //
                //     })
                //     .catch(e => {
                //         console.log(e);
                //     });
                this.setState({ loading: false });
            })
            .catch(() => {
                this.setState({ loading: false, error: 'Error while adding comment' });
            });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onPress.bind(this)}>
                Submit
            </Button>
        );
    }

    renderComments() {
        return this.state.comments.map(comment =>
            <Card>
                <CardSection>
                    <Text style={TEXT_STYLE}>
                        <Text style={{ color: APP_BLUE }}>{comment.email}</Text>
                        {' '}{comment.time}
                    </Text>
                </CardSection>
                <CardSection>
                    <Text style={TEXT_STYLE}>{comment.text}</Text>
                </CardSection>
            </Card>
        );
    }

    render() {
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={60}
                behavior="padding"
            >
                <ScrollView>
                    <Card>
                        <CardSection>
                            <Text style={HEADER_STYLE}>Leave a comment</Text>
                        </CardSection>
                        <CardSection>
                        <TextArea
                            value={this.state.comment}
                            onChangeText={comment => this.setState({ comment })}
                            placeholder={'Enter your comment here'}
                        />
                        </CardSection>
                        <Text style={ERROR_TEXT_STYLE}>{this.state.error}</Text>
                        <CardSection>
                            {this.renderButton()}
                        </CardSection>
                    </Card>
                    {this.renderComments()}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default Comments;
