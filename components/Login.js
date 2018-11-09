import React, { Component } from 'react';
import { View, TextInput, Text, ActivityIndicator  } from 'react-native';
import {Button, CheckBox} from 'native-base';
import SignUp from './SignUp';
import firebase from 'firebase';

export default  class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            isSignupActivate : false,
            userId : '',
            userPass : '',
            isSaveUserInfo : false,
            isLoading : false,
            userData : null,
        }  

        this.activateIndicator = this.activateIndicator.bind(this)
    }

    closeSignup(){
        this.setState({
            isSignupActivate : false,
        })
    }

    activateIndicator(bool){
        this.setState({
            isLoading : bool
        })
    }

    signIn(){

        if( this.state.userId == '' ){
            return alert('아이디를 입력해주세요')
        }

        if( this.state.userId == '' ){
            return alert('비밀번호를 입력해주세요')
        }
        
        let that = this;
        this.activateIndicator(true);

        firebase.auth().signInWithEmailAndPassword(this.state.userId, this.state.userPass)
        .then((res)=>{
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        var email = user.email;
                        var uid = user.uid;

                        firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
                            that.setState({
                                userData : snapshot.val()
                            })
                        })
                        .then(
                            ()=> {
                                alert('로그인에 성공하였습니다.')
                                return that.activateIndicator(false);
                            }
                        )

                    } else {
                        alert('사용자 정보가 없습니다')
                        return that.activateIndicator(false);
                    }
                })
            }
        )
        .catch((err)=> {
            this.activateIndicator(false);
            console.log(err)
            
            if(err.code == 'auth/invalid-email'){
                return alert('올바른 이메일을 입력해주세요')
            }
            if(err.code == "auth/user-not-found"){
                return alert('존재하지 않는 회원입니다.')
            }
            if(err.code == "auth/wrong-password"){
                return alert('비밀번호가 틀립니다.')
            }
        })
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: "#0099ff", paddingLeft:'3%', paddingRight:'3%',  }}>

                <View style={{flex:2, marginTop:20, justifyContent:'center', alignItems:'center',}}>
                    <Text style={{fontSize:50, marginTop:20, color:'#fff', }}>
                        LOGO IMAGE
                    </Text>
                </View>

                <View style={{flex:2, marginTop:20 }}>
                    <Text>
                        userName
                    </Text>
                    <TextInput
                        allowFontScaling={false}
                        onChangeText={ 
                            (text)=>{
                                this.setState({
                                    userId : text
                                })
                            }
                        } 
                        placeholder="아이디"
                        selectionColor='#555'
                        placeholderTextColor="#ddd"
                        underlineColorAndroid='transparent'
                        style={{
                            height: 40,
                            paddingLeft:10,
                            color: "#555",
                            backgroundColor: '#fff'
                        }}
                        value={this.state.userId}
                    />

                    <Text>
                        passwords
                    </Text>
                    <TextInput
                        allowFontScaling={false}
                        onChangeText={ 
                            (text)=>{
                                this.setState({
                                    userPass : text
                                })
                            }
                        } 
                        secureTextEntry={true}
                        placeholder="비밀번호"
                        selectionColor='#555'
                        placeholderTextColor="#ddd"
                        underlineColorAndroid='transparent'
                        style={{
                            height: 40,
                            paddingLeft:10,
                            color: "#555",
                            backgroundColor: '#fff'
                        }}
                        value={this.state.userPass}
                    />
                </View>   
                <View style={{flex:2, justifyContent:'flex-start', alignItems:'center', }}>

                    <View style={{flexDirection:'row', alignSelf:'flex-start',}}>
                        <CheckBox 
                            style={{backgroundColor:'#000',}} 
                            checked={this.state.isSaveUserInfo} 
                            onPress={ ()=> this.setState({ isSaveUserInfo : !this.state.isSaveUserInfo }) } 
                        />
                        <Text style={{marginLeft:15,}}>정보저장</Text>
                    </View>    

                    <Button
                        style={{ width:'100%', height:40, marginTop:10, justifyContent:'center', alignSelf:'center',}}
                        onPress={this.signIn.bind(this)}
                    >
                        <Text>로그인</Text>
                    </Button>

                    <Button
                        style={{ width:'100%', height:40, marginTop:10, justifyContent:'center', alignSelf:'center', backgroundColor:'#fff',}}
                        onPress={()=> this.setState({
                            isSignupActivate : true
                        }) }
                    >
                        <Text>회원가입</Text>
                    </Button>
                    
                </View>   

                <View style={{flex:6 }}>

                    <Button
                        style={{ width:'100%', height:40, justifyContent:'center', alignSelf:'center', backgroundColor:'#999', marginTop:10,}}
                    >
                        <Text>facebook</Text>
                    </Button>

                    <Button
                        style={{width:'100%', height:40, justifyContent:'center', alignSelf:'center', backgroundColor:'#bbb', marginTop:10,}}
                    >
                        <Text>facebook</Text>
                    </Button>

                    <Button
                        style={{width:'100%', height:40, justifyContent:'center', alignSelf:'center', backgroundColor:'#aaa', marginTop:10,}}
                    >
                        <Text>facebook</Text>
                    </Button>

                    <Button
                        style={{width:'100%', height:40, justifyContent:'center', alignSelf:'center', backgroundColor:'#aaa', marginTop:10,}}
                    >
                        <Text>facebook</Text>
                    </Button>

                    <Button
                        style={{width:'100%', height:40, justifyContent:'center', alignSelf:'center', backgroundColor:'#aaa', marginTop:10,}}
                    >
                        <Text>facebook</Text>
                    </Button>

                    <Button
                        style={{width:'100%', height:40, justifyContent:'center', alignSelf:'center', backgroundColor:'#aaa', marginTop:10,}}
                    >
                        <Text>facebook</Text>
                    </Button>

                </View>  
                
                {
                    this.state.isSignupActivate ? 
                    <SignUp
                        closeSignup = { this.closeSignup.bind(this) }
                        SignupActivate = {this.state.isSignupActivate}
                        activateIndicator = { this.activateIndicator.bind(this)} 
                    />
                    : null
                }

                {
                    this.state.isLoading ?
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        style={{ width: "110%", height: "100%", position: "absolute", backgroundColor: "#fff", opacity: 0.5, }}
                    />
                    :
                    null
                }

                
            </View>





        );
    }
}
