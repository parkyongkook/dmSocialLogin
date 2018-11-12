import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton , AccessToken, logout } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {

  initUser(token) {
    console.log(token)
    console.log('들어는 오는가')
    fetch('https://graph.facebook.com/v3.2/me?fields=email,name&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
    //   user.name = json.name
    //   user.id = json.id
    //   user.user_friends = json.friends
    //   user.email = json.email
    //   user.username = json.name
    //   user.loading = false
    //   user.loggedIn = true
    //   user.avatar = setAvatar(json.id)   
      console.log('페북유저정보 가져오기',json)   
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  } 

  render() {
    return (
      <View>
        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={
              (error, result) => {
              if (error) {
                  console.log('login has error: ', result.error)
              } else if (result.isCancelled) {
                  console.log('login is cancelled.')
              } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                  const { accessToken } = data
                  this.initUser(accessToken)
                  })
              }
              }
          }
          onLogoutFinished={logout} />
      </View>
    );
  }
};

module.exports = FBLoginButton;