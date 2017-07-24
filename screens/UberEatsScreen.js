import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, FlatList, View, Image} from 'react-native';
import Color from '../constants/Colors'

export default class UberEatsScreen extends React.Component {
  static navigationOptions = {
    title: 'UberEats',
  };
  
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
         * content, we just wanted to provide you with some helpful links */}
        <MyList
          {...this.props}
          data={[
            { title: '店舗1', key: 'item1' },
            { title: '店舗2', key: 'item2' },
          ]}
        />
      </ScrollView>
    );
  }
}

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };
  
  render() {
    return (
      <View
        style={{ marginTop: 10, flexDirection: 'column', height: 220, paddingLeft: 10, paddingRight: 10 }}
      >
        <Image source={{ uri: 'https://cdn-rs.ikyu.com/rsDatas/rsData103500/r103076/103076ga10000016.jpg' }}
               style={{ width: '100%', height: '75%' }}/>
        <View
          style={{ flexDirection: 'column', marginTop: 10 }}
        >
          <View
            style={{ flexDirection: 'row' }}
          >
            <Text
              {...this.props}
              style={{ width: '50%' }}
            >
              {this.props.title}
            </Text>
            <Text
              {...this.props}
              style={{ width: '50%', textAlign: 'right', fontWeight: '200', fontSize: 10 }}
            >
              この店舗はAM10:00からです
            </Text>
          </View>
          <View
            style={{marginTop: 5}}
          >
            <Text
              {...this.props}
              style={{ width: '50%', textAlign: 'left', color: Color.tabIconDefault, fontSize: 10 }}
            >
              説明説明説明説明
              説明説明説明説明
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

class MyList extends React.PureComponent {
  state = { selected: (new Map()) };
  
  _onPressItem = (id) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };
  
  _renderItem = ({ item }) => (
    <MyListItem
      id={item.key}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.key)}
      title={item.title}
    />
  );
  
  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
