import React, {Component} from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import { AuthSession } from 'expo';
const FB_APP_ID = '383011352363873'; 
export default class App extends Component {
  state = {
    result: null,
  };
  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl)
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v4.0/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    //console.log(result)
    const token = result.params.access_token
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    console.log(await response.json())
    this.setState({ result });
  }


  render(){
    
    return (
      <View style={styles.container}>
        <Button title="Open FB Auth" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
        </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
