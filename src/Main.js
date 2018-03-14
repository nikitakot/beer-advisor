import React from 'react';
import { Provider } from 'react-redux';
import RootStack from './router/RootStack';
import NavigationService from './utlis/NavigationService';

const Main = () => (
    <Provider>
        <RootStack
            ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }}
        />
    </Provider>
);

export default Main;
