import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootStack from './router/RootStack';
import NavigationService from './utlis/NavigationService';
import reducers from './reducers';
import { functions } from './config/firebase';

class Main extends Component {

    componentWillMount() {
        fetch('https://us-central1-beer-advisor-81981.cloudfunctions.net/app/add-bar/?test=test')
            .then((res) => res.json())
            .then((data) => console.log(data));
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
