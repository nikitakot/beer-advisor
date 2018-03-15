import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootStack from './router/RootStack';
import NavigationService from './utlis/NavigationService';
import reducers from './reducers';

class Main extends Component {

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyCQjAHCdWFL3E07UvvE5Ve4CNAZkVGJYNY',
            authDomain: 'beer-advisor-81981.firebaseapp.com',
            databaseURL: 'https://beer-advisor-81981.firebaseio.com',
            projectId: 'beer-advisor-81981',
            storageBucket: 'beer-advisor-81981.appspot.com',
            messagingSenderId: '716209682893'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <RootStack
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
}

export default Main;
