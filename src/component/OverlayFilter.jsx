import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

function OverlayFilter({
  visible,
  onClose,
  textTitle,
  type,
  itemFacility,
  onChoose,
  setIsOpenList
}) {
  function renderItemFacility(item, index) {
    return (
      <>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          }}
          onPress={async () => {
            const indexx = item.id - 1;
            await onChoose(indexx);
            setIsOpenList(true)
          }}>
          <Image
            source={{uri: item.image}}
            style={{width: 40, height: 40, marginRight: 10}}
            resizeMode="contain"
          />
          <Text style={styles.textTitle}>{`${item.name}`}</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
      </>
    );
  }

  return (
    <SafeAreaView>
      <Modal
        swipeDirection={'down'}
        isVisible={visible}
        onBackdropPress={() => {
          !type && onClose();
        }}
        onBackButtonPress={() => {
          !type && onClose();
        }}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>{`${textTitle}`}</Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}>
              <Icon size={24} key={'x'} name="x" style={{color: 'black'}} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={itemFacility}
            keyExtractor={id => id.id}
            renderItem={({item, index}) => {
              return renderItemFacility(item, index);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default OverlayFilter;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 3,
    shadowRadius: 5,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    maxHeight: Dimensions.get('window').height / 1.4,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  viewText: {alignItems: 'center', marginTop: 20, marginHorizontal: 20},
  textTitle: {
    fontSize: 14,
    color: 'black',
  },
  closeText: {
    fontSize: 18,
    color: 'black',
  },

  footerView: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  buttonCancel: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 24,
    marginTop: 10,
  },

  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    marginTop: 10,
  },
});
