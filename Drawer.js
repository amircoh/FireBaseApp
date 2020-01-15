import React, { Component } from 'react';

import {
    Container, Header, Content, Form, Item, Label, Button, Text, Icon, Left, Title, Body,
    Right, Thumbnail, Input, Footer, FooterTab, Badge
} from 'native-base';

class Drawer extends Component {
    render() {
        return (
            <Content style={{ backgroundColor: '#ffffff', padding: 10 }}>
                <Item>
                    <Text>Meeages</Text>
                    <Badge primary><Text>4</Text></Badge>
                </Item>
            </Content>
        );
    }
}

export default Drawer;