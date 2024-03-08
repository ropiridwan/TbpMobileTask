import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {dataPublicFacility} from '../data/PublicFacility';

export default function CustomHeader({
  indexFacility,
  onChooseItem,
  setIndexFacility,
  setOnChooseItem,
}) {
  function closeHeader() {
    setIndexFacility(null);
    setOnChooseItem(null);
  }

  function renderHeader() {
    return (
      <>
        <Icon
          size={34}
          key={'options'}
          name="align-justify"
          style={{color: 'white'}}
        />
        <Text style={styles.font12White}>HEADER</Text>
        <Icon size={34} key={'bell'} name="bell" style={{color: 'white'}} />
      </>
    );
  }

  function renderHeaderOverlay() {
    return (
      <>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            closeHeader();
          }}>
          <Icon
            size={34}
            key={'back'}
            name="chevron-left"
            style={{color: 'black'}}
          />
          <Text style={styles.font12Black}>
            {dataPublicFacility[indexFacility]?.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            closeHeader();
          }}>
          <Icon size={34} key={'x'} name="x" style={{color: 'black'}} />
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            indexFacility !== null || onChooseItem ? 'white' : 'darkblue',
        },
      ]}>
      {indexFacility !== null || onChooseItem
        ? renderHeaderOverlay()
        : renderHeader()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'darkblue',
    padding: 12,
  },
  font12White: {fontSize: 24, color: 'white', fontWeight: '700'},
  font12Black: {fontSize: 24, color: 'black', fontWeight: '700'},
});
