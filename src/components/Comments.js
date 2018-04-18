import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { Button, Card, CardSection, Spinner, TextArea } from './common';
import { APP_BLUE, ERROR_TEXT_STYLE, HEADER_STYLE, TEXT_STYLE } from '../utlis/constants';
import { connect } from 'react-redux';


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
        this.refreshComments();
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
                this.refreshComments();
                this.setState({ loading: false, comment: '' });
            })
            .catch(e => {
                console.log(e);
                this.setState({ loading: false, error: 'Error while adding comment' });
            });
    }

    deleteComment(id) {
        Alert.alert(
            'Confirm',
            'Delete this comment?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () => {
                        const { deleteComment } = this.props.navigation.state.params;
                        this.setState({ loading: true });
                        deleteComment(id)
                            .then(() => {
                                this.refreshComments();
                                this.setState({ loading: false });
                            })
                            .catch(e => {
                                console.log(e);
                                this.setState(
                                    { loading: false, error: 'Error while deleting comment' });
                            });
                    }
                },
            ],
            { cancelable: false }
        );
    }

    refreshComments() {
        const { getComments } = this.props.navigation.state.params;
        this.setState({ loading: true });
        getComments()
            .then(({ comments }) => {
                this.setState({ loading: false, comments });
            })
            .catch(e => {
                console.log(e);
                this.setState({ loading: false, error: 'Error loading the comments' });
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
            <Card key={comment.id}>
                <CardSection>
                    <Text style={TEXT_STYLE}>
                        <Text style={{ color: APP_BLUE }}>{comment.email}</Text>
                        {' '}{new Date(comment.time).toLocaleString()}
                    </Text>
                </CardSection>
                <CardSection>
                    <Text style={TEXT_STYLE}>{comment.comment}</Text>
                </CardSection>
                {this.props.user.uid === comment.uid ?
                    <CardSection>
                        <Button onPress={this.deleteComment.bind(this, comment.id)}>
                            Delete this comment
                        </Button>
                    </CardSection>
                    : null
                }
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
                        {this.state.error ?
                            <Text style={ERROR_TEXT_STYLE}>
                                {this.state.error}
                            </Text>
                            : null}
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

const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return { user };
};

export default connect(mapStateToProps, null)(Comments);
