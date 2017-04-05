import React from "React";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native"
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';


function renderTweets(tweet){
  console.log(tweet.profile_image)
  return (
  <WingBlank key={tweet.created_at} size="lg">
    <WhiteSpace size="lg" />
    <Card>
      <Card.Header
        style={styles.header}
        title={tweet.name}
        thumb={tweet.profile_image}
        thumbStyle={styles.thumbStyle}
      />
      <Card.Body>
        <Text style={styles.cardBody}>{tweet.text}</Text>
        {tweet.image !== "" && <Image source={{uri:tweet.image}} style={styles.image} />}
      </Card.Body>
      <Card.Footer content={tweet.created_at.substring(0, 10) + " " + tweet.created_at.substring(11, 19)}/>
    </Card>
    <WhiteSpace size="lg" />
  </WingBlank>
  )
}

export default ({ tweets }) => {

  tweets = tweets.tweets;

  return(
  
  <View style={styles.container}>
    <ScrollView
      automaticallyAdjustContentInsets={false}
      style={styles.scrollView}>
      {tweets.map((tweet) => renderTweets(tweet))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 3,
    position: 'relative'
  },
  scrollView: {
    flex: 1,
    width: 400
  },
  cardBody: {
    marginLeft: 10
  },
  image: {
    marginLeft: 10,
    width: 345,
    height: 192
  },
  thumbStyle: {
    width: 35,
    height: 35
  }
})