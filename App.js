import React from 'react';
import {View, Text } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { Scene, ActionConst, Router } from 'react-native-router-flux';
import Login from './components/Login';



const ReduxRouter = connect((state) => ({ state: state.route }))(Router);
const reducers = require('./reducers').default;

export default class App extends React.Component {

    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <Provider store={createStore(reducers, {})}>
                <ReduxRouter
                    backAndroidHandler = {this.handleAndroidBack}
                >
                    <Scene key='root'
                        panHandlers={null}
                        type={ActionConst.RESET}
                    >
                        <Scene key='Login'
                            closeDrawerHome={this.closeDrawer}
                            component={Login}
                            hideNavBar={true}
                            initial={true} 
                        />
                    
                    </Scene>
                </ReduxRouter>
            </Provider>
        );
    }
}
