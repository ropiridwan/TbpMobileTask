import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  PermissionsAndroid,
  Alert,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import OverlayFilter from '../component/OverlayFilter';
import {dataPublicFacility} from '../data/PublicFacility';
import CustomHeader from '../component/CustomHeader';
import ListState from '../component/ListState';

export default function StartState() {
  const [text, onChangeText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);
  const [position, setPosition] = useState({
    latitude: -6.230061,
    longitude: 106.849864,
    latitudeDelta: 0.101,
    longitudeDelta: 0.101,
  });
  const [indexFacility, setIndexFacility] = useState(null);
  const [onChooseItem, setOnChooseItem] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const data = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.101,
              longitudeDelta: 0.101,
            };
            setPosition(data);
            console.log('Current Position:', position.coords);
          },
          error => {
            console.error('Error getting location:', error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  function renderTextInput() {
    return (
      <View style={styles.containerTextInput}>
        <Icon size={20} key={'search'} name="search" style={{color: 'black'}} />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={text}
          placeholder="Cari Lokasi"
        />
      </View>
    );
  }

  function renderFilter() {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsOpen(true);
        }}
        style={styles.containerFilter}>
        <IonIcons size={20} name="filter" style={{color: 'black'}} />
        <Text style={styles.text}> Filter Peta</Text>
      </TouchableOpacity>
    );
  }

  async function onChoose(index) {
    await setIndexFacility(index);
    setIsOpen(false);
  }

  async function onChooseItemFunct(item) {
    await setOnChooseItem(item);
    setIsOpenList(false);
  }

  function renderItemChoose() {
    return (
      <View style={styles.containerItem}>
        <Image
          style={styles.itemImageMarker}
          resizeMode="contain"
          source={{
            uri: onChooseItem?.icon,
          }}
        />
        <View style={{marginHorizontal: 12}}>
          <Text style={[styles.text, {fontWeight: '700'}]}>
            {onChooseItem?.name}
          </Text>

          <Text style={[styles.text, {marginVertical: 6}]}>
            {onChooseItem?.officer_name
              ? onChooseItem?.officer_name
              : 'No officer name'}{' '}
            -{' '}
            {onChooseItem?.officer_rank
              ? onChooseItem?.officer_rank
              : 'no rank'}
          </Text>

          <Text style={styles.text}>{onChooseItem?.officer_address}</Text>

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
            <Text style={styles.text}>{onChooseItem?.phone_number}</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonCall}
            onPress={() => {
              Linking.openURL('https://wa.me/+6' + onChooseItem?.phone_number);
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
      </View>
    );
  }

  return (
    <>
      <CustomHeader
        indexFacility={indexFacility}
        onChooseItem={onChooseItem}
        setIndexFacility={setIndexFacility}
        setOnChooseItem={setOnChooseItem}
        headerName={dataPublicFacility[indexFacility]?.name}
      />
      <SafeAreaView style={{flex: 1}}>
        <MapView
          style={styles.maps}
          provider={PROVIDER_GOOGLE}
          region={onChooseItem ? onChooseItem?.location : position}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userLocationPriority="high"
          rotateEnabled={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          followsUserLocation={true}
          showsCompass={true}>
          {indexFacility !== null ? (
            dataPublicFacility[indexFacility]?.data.map(item => {
              return (
                <Marker
                  id={item.id}
                  draggable
                  coordinate={{
                    latitude: Number(item.location.latitude),
                    longitude: Number(item.location.longitude),
                  }}
                  onPress={() => {
                    setOnChooseItem(item);
                  }}>
                  <Image
                    style={styles.itemImageMarker}
                    resizeMode="contain"
                    source={{
                      uri: item.icon,
                    }}
                  />
                </Marker>
              );
            })
          ) : (
            <Marker
              draggable
              coordinate={{
                latitude: Number(position.latitude),
                longitude: Number(position.longitude),
              }}>
              <Image
                style={styles.imageMarker}
                resizeMode="contain"
                source={{
                  uri: 'https://static.thenounproject.com/png/63811-200.png',
                }}
              />
            </Marker>
          )}
          <Circle
            center={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            radius={150}
            strokeWidth={1}
            strokeColor={'red'}
            fillColor={'rgba(212, 46, 18,0.2)'}
          />
        </MapView>
        {renderTextInput()}
        {indexFacility == null && renderFilter()}
        {onChooseItem && renderItemChoose()}

        <OverlayFilter
          visible={isOpen}
          onClose={() => setIsOpen(false)}
          textTitle={'Pilih Filter'}
          itemFacility={dataPublicFacility}
          onSubmitHandler={async () => {
            setIsOpen(false);
          }}
          onChoose={onChoose}
          setIsOpenList={setIsOpenList}
        />

        {isOpenList &&(
        <ListState
          visible={isOpenList}
          onClose={() => setIsOpenList(false)}
          itemFacility={dataPublicFacility[indexFacility]?.data}
          onChoose={onChooseItemFunct}
        />)
        }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  // container
  containerTextInput: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 1,
  },
  containerFilter: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 1,
  },
  containerItem: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: Dimensions.get('window').height / 7,
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    borderRadius: 12,
    elevation: 10,
  },

  maps: {
    height: '100%',
    width: '100%',
  },
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

  // text
  text: {fontSize: 12, color: 'black'},
  textInput: {flex: 1, color: 'black', alignSelf: 'center'},

  // image
  imageMarker: {tintColor: 'darkblue', width: 50, height: 50},
  itemImageMarker: {width: 50, height: 50},
});
