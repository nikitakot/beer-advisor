import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootStack from './router/RootStack';
import NavigationService from './utlis/NavigationService';
import reducers from './reducers';
import { Permissions } from 'expo';

class Main extends Component {

    componentWillMount() {
        Permissions.askAsync(Permissions.LOCATION);
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
