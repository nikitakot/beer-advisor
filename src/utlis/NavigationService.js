/* eslint-disable no-underscore-dangle */
import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName,
            params,
        })
    );
}

function reset(routeName) {
    _navigator.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })],
    }));
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    reset
};
