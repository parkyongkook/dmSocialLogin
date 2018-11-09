import React, { Component } from 'react';
import { View, TextInput, Text, Animated, Easing, StyleSheet, TouchableOpacity } from 'react-native';
import {Button, CheckBox} from 'native-base';

import { database } from '../firebase/Config'
import * as firebase from 'firebase'


export default  class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            email : '',
            name : '',
            phone : '',
            userPass: '',
            userPassConfirm : '',
        }
        this.animatedValue = new Animated.Value(0)
    }


    componentDidMount () {
        this.animate()
    }

    confirmCreateAccount(){

        let that = this;

        //이메일 검증 
        if( this.state.email == '' || this.state.email == null ){
            return alert('이메일은 필수 항목입니다.');
        }


        //이름 항목 검증 
        if( this.state.name == '' ){
            return alert('이름항목은 필수항목입니다.');
        }

        //휴대폰번호 검증 
        if( this.state.phone == '' ){
            return alert('휴대폰번호는 필수항목입니다.');
        }

        //비밀번호 검증
        if( this.state.userPass == '' ||  this.state.userPassConfirm == '' ){
            return alert('비밀번호항목은 필수입니다.');
        }
        
        if( this.state.userPass != this.state.userPassConfirm ){
            return alert('비밀번호가 서로 다릅니다');
        }

        this.props.activateIndicator(true)

        firebase.auth().createUserWithEmailAndPassword( this.state.email, this.state.userPass )
        .then( (data)=>{
            alert('회원가입에 성공하였습니다.')          
            this.props.closeSignup()
        })
        .then( ()=>{
            //사용자 세션 지속성 로컬에 저장
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

            firebase.auth().onAuthStateChanged(function(user) {
              if(user!==null){

                var email = user.email;
                var uid = user.uid;

                //파이어베이스 데이터베이스에 유저 uid 값내부에 유저데이터를 저장
                firebase.database().ref('users/' + uid).set({
                  "email": email,
                  "name" : that.state.name ,
                  "phone" : that.state.phone
                });
              }
            });

            this.props.activateIndicator(false)
        })
        .catch(
            (error)=>{
                error.code == "auth/invalid-email" ? alert('이메일형식을 확인해주세요') : null;
                this.props.activateIndicator(false)
            }
        );

    }


    animate () {

        this.animatedValue.setValue(0)
        
        Animated.timing(
          this.animatedValue,
          {
            toValue: 1,
            duration: 300,
            easing: Easing.in
          }
        ).start(
            (o) => {
                if(o.finished) {
                   
                }
          }
        );
  
    }
    

    render() {
        const bottom = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200]
        })
 
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.5, 1]
        })

        return (
            <Animated.View
                style={{ 
                    display: this.props.SignupActivate ? 'flex' : 'none',
                    width:300, 
                    borderRadius:20,
                    position:'absolute', 
                    opacity: opacity,
                    left:'50%', 
                    marginLeft:-140, 
                    bottom, 
                    backgroundColor: "rgba(0,0,0,0.7)", 
                    paddingLeft:'3%', 
                    paddingRight:'3%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} 
            >
                <TouchableOpacity style={{ position:'absolute', top:10, right:20 }}
                    onPress={()=>this.props.closeSignup()}
                >
                    <View
                        style={{width:30, height:30, backgroundColor:'#fff',}}
                    />
                </TouchableOpacity>    
               
                <View style={{flex:1,}}> 
                    <Text style={{marginTop:20, marginBottom:20, color:'#999',}}>회원가입</Text>
                </View> 

                <View style={{flex:6, width:'90%',}}>

                    <View style={{}}>  
                        <Text style={{color:'#777',}}>회원정보입력</Text>

                        <View style={{ flex:1, marginTop:10, flexDirection:'row', justifyContent:'center',}}>
                            <TextInput
                                allowFontScaling={false}
                                onChangeText={ 
                                    (text)=>{
                                        this.setState({
                                            email : text
                                        })
                                    }
                                } 
                                placeholder="이메일"
                                keyboardType='email-address'
                                selectionColor='#555'
                                placeholderTextColor="#999"
                                underlineColorAndroid='transparent'
                                style={[styles.textInput,{flex:5, marginTop:0, marginRight:10,}]}
                                value={this.state.email}
                            />
                            <Button style={{width:60, height:30, justifyContent:'center', backgroundColor: '#0099ff', borderRadius:0,}}>
                                <Text style={{color:'#fff',}}>중복확인</Text>
                            </Button>
                            
                        </View>

                        <TextInput
                            allowFontScaling={false}
                            onChangeText={ 
                                (text)=>{
                                    this.setState({
                                        name : text
                                    })
                                }
                            } 
                            placeholder="이름"
                            selectionColor='#555'
                            placeholderTextColor="#999"
                            underlineColorAndroid='transparent'
                            style={styles.textInput}
                            value={this.state.name}
                        />

                        <TextInput
                            allowFontScaling={false}
                            onChangeText={ 
                                (text)=>{
                                    this.setState({
                                        phone : text
                                    })
                                }
                            } 
                            placeholder="휴대폰번호"
                            keyboardType='phone-pad'  
                            selectionColor='#555'
                            placeholderTextColor="#999"
                            underlineColorAndroid='transparent'
                            style={styles.textInput}
                            value={this.state.phone}
                        />
                    </View>        

                    <View style={{marginTop:30,}}>  
                        <Text style={{color:'#777',}}>비밀번호 입력</Text>
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
                            placeholderTextColor="#999"
                            underlineColorAndroid='transparent'
                            style={styles.textInput}
                            value={this.state.userPass}
                        />
                        <TextInput
                            allowFontScaling={false}
                            onChangeText={ 
                                (text)=>{
                                    this.setState({
                                        userPassConfirm : text
                                    })
                                }
                            } 
                            secureTextEntry={true}
                            placeholder="비밀번호 확인"
                            selectionColor='#555'
                            placeholderTextColor="#999"
                            underlineColorAndroid='transparent'
                            style={styles.textInput}
                            value={this.state.userPassConfirm}
                        />
                    </View>    
                    
                    <Button 
                        style={{width:'100%', height:40, marginTop:30, 
                        marginBottom:30, backgroundColor:'#0099ff', justifyContent:'center',}}
                        onPress={()=>this.confirmCreateAccount()}
                    >
                        <Text style={{color:'#fff',}}>확인</Text>
                    </Button>

                </View>    
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    textInput : {
        height: 30,
        marginTop:10,
        paddingLeft:10,
        color: "#555",
        backgroundColor: '#ddd'
    }
});

