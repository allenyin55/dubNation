import React, { Component } from 'react';
import { Container, Content, Tab, Tabs } from 'native-base';
import { Text } from "react-native"
 
class TabsView extends Component {
    render() {
        return (
            <Container>
            <Tabs>
                <Tab heading="Tab1" tabStyle={color: "green"}>
                    <Text>
                        asdf   
                    </Text>
                </Tab>
                <Tab heading="Tab2">
                  <Text>
                        you
                    </Text>
                </Tab>
                <Tab heading="Tab3">
                  <Text>
                     asdf
                    </Text>
                </Tab>
            </Tabs>
            </Container>
        );
    }
}
 
export default TabsView;