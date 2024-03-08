import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

export default function ListState({visible, onClose, itemFacility, onChoose}) {
  const [dataa, setDataa] = useState(null);
  const [text, onChangeText] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Ascending', value: 'asc'},
    {label: 'Descending', value: 'desc'},
  ]);

  useEffect(() => {
    if (value == 'asc') {
      sortAsc();
    } else if (value == 'desc') {
      sortDesc();
    }
  }, [value]);

  function sortAsc() {
    const ascendingOrder = itemFacility
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    return setDataa(ascendingOrder);
  }

  function sortDesc() {
    const sortedDesc = itemFacility
      .slice()
      .sort((a, b) => b.name.localeCompare(a.name));

    return setDataa(sortedDesc);
  }

  function renderItemFacility(item, index) {
    return (
      <>
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            onChoose(item);
          }}
          style={styles.containerItem}>
          <Image
            style={styles.itemImageMarker}
            resizeMode="contain"
            source={{
              uri: item?.icon,
            }}
          />
          <View style={{marginHorizontal: 12}}>
            <Text style={[styles.text, {fontWeight: '700'}]}>{item?.name}</Text>

            <Text style={[styles.text, {marginVertical: 6}]}>
              {item?.officer_name ? item?.officer_name : 'No officer name'} -{' '}
              {item?.officer_rank ? item?.officer_rank : 'no rank'}
            </Text>

            <Text style={styles.text}>{item?.officer_address}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 8,
              }}>
              <Icon
                size={12}
                key={'phone'}
                name="phone"
                style={{color: 'black', marginRight: 10}}
              />
              <Text style={styles.text}>{item?.phone_number}</Text>
            </View>

            <TouchableOpacity
              style={styles.buttonCall}
              onPress={() => {
                Linking.openURL('https://wa.me/+6' + item?.phone_number);
              }}>
              <Icon
                size={12}
                key={'phone'}
                name="phone"
                style={{color: 'blue', marginRight: 10}}
              />
              <Text style={[styles.text, {color: 'blue'}]}>Hubungi</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
      </>
    );
  }

  async function handleSearch(text) {
    await setValue(null);
    onChangeText(text);

    const filtered = itemFacility.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    return setDataa(filtered);
  }

  function renderTextInput() {
    return (
      <View style={styles.containerTextInput}>
        <Icon size={20} key={'search'} name="search" style={{color: 'black'}} />
        <TextInput
          style={styles.textInput}
          onChangeText={handleSearch}
          value={text}
          placeholder="Cari.."
        />
      </View>
    );
  }

  function renderDropDown() {
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Pilih Short'}
        style={styles.containerDropDown}
        containerStyle={{
          width: '30%',
        }}
        maxHeight={1000}
        dropDownContainerStyle={{borderWidth: 0.5, borderColor: 'grey'}}
        listItemContainerStyle={{borderWidth: 0.5, borderColor: 'grey'}}
        placeholderStyle={{color: 'grey', opacity: 0.7}}
        textStyle={{fontSize: 12}}
      />
    );
  }

  return (
    <SafeAreaView>
      <Modal
        isVisible={visible}
        onBackdropPress={() => {
          onClose();
        }}
        onBackButtonPress={() => {
          onClose();
        }}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        style={styles.modal}>
        <View style={styles.containerFloatItem}>
          {renderTextInput()}

          {renderDropDown()}
        </View>
        <View style={styles.container}>
          <FlatList
            data={dataa ? dataa : itemFacility}
            keyExtractor={id => id.id}
            renderItem={({item, index}) => {
              return renderItemFacility(item, index);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonMap}
          onPress={() => {
            onClose();
          }}>
          <Icon
            size={12}
            key={'map'}
            name="map"
            style={{color: 'black', marginRight: 10}}
          />
          <Text style={styles.text}>Lihat Peta</Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  containerDropDown: {
    backgroundColor: 'white',
    opacity: 0.8,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  containerTextInput: {
    flex: 1,
    borderWidth: 0.4,
    borderColor: 'grey',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 6,
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
    maxHeight: Dimensions.get('window').height / 2,
  },
  containerFloatItem: {
    position: 'absolute',
    top: '10%',
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {fontSize: 12, color: 'black'},
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
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
  itemImageMarker: {width: 50, height: 50},
  buttonCall: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 4,
    padding: 8,
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 6,
    width: '40%',
    justifyContent: 'center',
  },
  buttonMap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 4,
    padding: 8,
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 6,
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: '30%',
    justifyContent: 'center',
  },
  textInput: {flex: 1, color: 'black', alignSelf: 'center'},
});
