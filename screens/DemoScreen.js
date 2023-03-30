// import React, { useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ScrollView,
//   Animated,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
// } from "react-native";
// import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Fontisto from 'react-native-vector-icons/Fontisto';

// import { markers, mapDarkStyle, mapStandardStyle } from '../model/mapData';
// import StarRating from '../components/StarRating';

// import { useTheme } from '@react-navigation/native';

// const { width, height } = Dimensions.get("window");
// const CARD_HEIGHT = 200;
// const CARD_WIDTH = width * 0.8;
// const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

// const ExploreScreen = () => {
//   const theme = useTheme();

//   const initialMapState = {
//     markers,
//   //   categories: [
//   //     { 
//   //       name: 'Fastfood Center', 
//   //       icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
//   //     },
//   //     {
//   //       name: 'Restaurant',
//   //       icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
//   //     },
//   //     {
//   //       name: 'Dineouts',
//   //       icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
//   //     },
//   //     {
//   //       name: 'Snacks Corner',
//   //       icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
//   //     },
//   //     {
//   //       name: 'Hotel',
//   //       icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
//   //     },
//   // ],
//     region: {
//       latitude: 22.62938671242907,
//       longitude: 88.4354486029795,
//       latitudeDelta: 0.04864195044303443,
//       longitudeDelta: 0.040142817690068,
//     },
//   };

//   const [state, setState] = React.useState(initialMapState);

//   let mapIndex = 0;
//   let mapAnimation = new Animated.Value(0);

//   useEffect(() => {
//     mapAnimation.addListener(({ value }) => {
//       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
//       if (index >= state.markers.length) {
//         index = state.markers.length - 1;
//       }
//       if (index <= 0) {
//         index = 0;
//       }

//       clearTimeout(regionTimeout);

//       const regionTimeout = setTimeout(() => {
//         if( mapIndex !== index ) {
//           mapIndex = index;
//           const { coordinate } = state.markers[index];
//           _map.current.animateToRegion(
//             {
//               ...coordinate,
//               latitudeDelta: state.region.latitudeDelta,
//               longitudeDelta: state.region.longitudeDelta,
//             },
//             350
//           );
//         }
//       }, 10);
//     });
//   });

//   const interpolations = state.markers.map((marker, index) => {
//     const inputRange = [
//       (index - 1) * CARD_WIDTH,
//       index * CARD_WIDTH,
//       ((index + 1) * CARD_WIDTH),
//     ];

//     const scale = mapAnimation.interpolate({
//       inputRange,
//       outputRange: [1, 1.5, 1],
//       extrapolate: "clamp"
//     });

//     return { scale };
//   });

//   const onMarkerPress = (mapEventData) => {
//     const markerID = mapEventData._targetInst.return.key;

//     let x = (markerID * CARD_WIDTH) + (markerID * 20); 
//     if (Platform.OS === 'ios') {
//       x = x - SPACING_FOR_CARD_INSET;
//     }

//     _scrollView.current.scrollTo({x: x, y: 0, animated: true});
//   }

//   const _map = React.useRef(null);
//   const _scrollView = React.useRef(null);

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={_map}
//         initialRegion={state.region}
//         style={styles.container}
//         provider={PROVIDER_GOOGLE}
//         customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
//       >
//         {state.markers.map((marker, index) => {
//           const scaleStyle = {
//             transform: [
//               {
//                 scale: interpolations[index].scale,
//               },
//             ],
//           };
//           return (
//             <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
//               <Animated.View style={[styles.markerWrap]}>
//                 <Animated.Image
//                   source={require('../assets/map_marker.png')}
//                   style={[styles.marker, scaleStyle]}
//                   resizeMode="cover"
//                 />
//               </Animated.View>
//             </MapView.Marker>
//           );
//         })}
//       </MapView>
//       <View style={styles.searchBox}>
//         <TextInput 
//           placeholder="Search here"
//           placeholderTextColor="#000"
//           autoCapitalize="none"
//           style={{flex:1,padding:0}}
//         />
//         <Ionicons name="ios-search" size={20} />
//       </View>
//       <ScrollView
//         horizontal
//         scrollEventThrottle={1}
//         showsHorizontalScrollIndicator={false}
//         height={50}
//         style={styles.chipsScrollView}
//         contentInset={{ // iOS only
//           top:0,
//           left:0,
//           bottom:0,
//           right:20
//         }}
//         contentContainerStyle={{
//           paddingRight: Platform.OS === 'android' ? 20 : 0
//         }}
//       >
//         {state.categories.map((category, index) => (
//           <TouchableOpacity key={index} style={styles.chipsItem}>
//             {category.icon}
//             <Text>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <Animated.ScrollView
//         ref={_scrollView}
//         horizontal
//         pagingEnabled
//         scrollEventThrottle={1}
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={CARD_WIDTH + 20}
//         snapToAlignment="center"
//         style={styles.scrollView}
//         contentInset={{
//           top: 0,
//           left: SPACING_FOR_CARD_INSET,
//           bottom: 0,
//           right: SPACING_FOR_CARD_INSET
//         }}
//         contentContainerStyle={{
//           paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
//         }}
//         onScroll={Animated.event(
//           [
//             {
//               nativeEvent: {
//                 contentOffset: {
//                   x: mapAnimation,
//                 }
//               },
//             },
//           ],
//           {useNativeDriver: true}
//         )}
//       >
//         {state.markers.map((marker, index) =>(
//           <View style={styles.card} key={index}>
//             <Image 
//               source={marker.image}
//               style={styles.cardImage}
//               resizeMode="cover"
//             />
//             <View style={styles.textContent}>
//               <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
//               <StarRating ratings={marker.rating} reviews={marker.reviews} />
//               <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
//               <View style={styles.button}>
//                 <TouchableOpacity
//                   onPress={() => {}}
//                   style={[styles.signIn, {
//                     borderColor: '#FF6347',
//                     borderWidth: 1
//                   }]}
//                 >
//                   <Text style={[styles.textSign, {
//                     color: '#FF6347'
//                   }]}>Order Now</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </Animated.ScrollView>
//     </View>
//   );
// };

// export default ExploreScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   searchBox: {
//     position:'absolute', 
//     marginTop: Platform.OS === 'ios' ? 40 : 20, 
//     flexDirection:"row",
//     backgroundColor: '#fff',
//     width: '90%',
//     alignSelf:'center',
//     borderRadius: 5,
//     padding: 10,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   chipsScrollView: {
//     position:'absolute', 
//     top:Platform.OS === 'ios' ? 90 : 80, 
//     paddingHorizontal:10
//   },
//   chipsIcon: {
//     marginRight: 5,
//   },
//   chipsItem: {
//     flexDirection:"row",
//     backgroundColor:'#fff', 
//     borderRadius:20,
//     padding:8,
//     paddingHorizontal:20, 
//     marginHorizontal:10,
//     height:35,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   scrollView: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//   },
//   endPadding: {
//     paddingRight: width - CARD_WIDTH,
//   },
//   card: {
//     // padding: 10,
//     elevation: 2,
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: "hidden",
//   },
//   cardImage: {
//     flex: 3,
//     width: "100%",
//     height: "100%",
//     alignSelf: "center",
//   },
//   textContent: {
//     flex: 2,
//     padding: 10,
//   },
//   cardtitle: {
//     fontSize: 12,
//     // marginTop: 5,
//     fontWeight: "bold",
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: "#444",
//   },
//   markerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//     width:50,
//     height:50,
//   },
//   marker: {
//     width: 30,
//     height: 30,
//   },
//   button: {
//     alignItems: 'center',
//     marginTop: 5
//   },
//   signIn: {
//       width: '100%',
//       padding:5,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 3
//   },
//   textSign: {
//       fontSize: 14,
//       fontWeight: 'bold'
//   }
// });













// import React, { useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ScrollView,
//   Animated,
//   Image,
//   Alert,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
// } from "react-native";
// import {request, PERMISSIONS} from 'react-native-permissions';
// import MapView, {PROVIDER_GOOGLE,Marker, Callout,Polygon} from "react-native-maps";
// import Geolocation from '@react-native-community/geolocation';

// import Carousel from 'react-native-snap-carousel';

// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import Fontisto from 'react-native-vector-icons/Fontisto';

// import { coordinates, mapDarkStyle, mapStandardStyle } from '../model/mapData';
// import StarRating from '../components/StarRating';

// import { useTheme } from '@react-navigation/native';



// const ExploreScreen = () => {
// const theme = useTheme();
//   const state={
//     // coordinates,
//     coordinates:[
//       { name:'1', latitude:38.766594, longitude: 8.999166 },
//       { name:'2', latitude:38.758594, longitude: 9.005286 },
//       { name:'3', latitude:38.768414, longitude: 8.993119 },
//       { name:'4', latitude:38.761834, longitude:  8.992297 },
//       { name:'5', latitude:38.746615, longitude: 9.009756 },
//     ]
//   }
// //    const initialMapState = {
// //     coordinates,
// //     initialRegion: {
// //           latitude: position.coords.latitude,
// //           longitude:position.coords.longitude,
// //           latitudeDelta:0.09,
// //           longitudeDelta:0.035
// //         }
// //   };
// // const [state, setState] = React.useState(initialMapState);

//   useEffect(() => {
//   this.requestLocationPermission();
//    }, []);

//   // componentDidMount(){
//   //   this.requestLocationPermission();
//   // }

//   requestLocationPermission = async () => {
//     if(Platform === 'ios'){
//       var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//       // console.log('iphone:'+response);

//       if(response === 'granted'){
//         this.locateCurrentPosition();
//       }
//     }else{
//       var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       // console.log('Android:'+response);
//         if(response === 'granted'){
//         this.locateCurrentPosition();
//       }
//     }
//   }
//   locateCurrentPosition = ()=>{
//     Geolocation.getCurrentPosition(
//       position => {
//         // console.log(JSON.stringify(position));

//         let initialRegion = {
//           latitude: position.coords.latitude,
//           longitude:position.coords.longitude,
//           latitudeDelta:0.09,
//           longitudeDelta:0.035
//         }

//         this.setState({initialRegion})
//       },
//       error=>Alert.alert(error.message),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
//      )
//   } 
//   // renderCarouselItem = (item) => {
//   //    <View style={styles.cardContainer}>
//   //      <Text style={styles.cardTitle}>{item.name}</Text>
//   //      <Image style={styles.cardImage}source={item.image} />
//   //    </View>
//   // }
//    return (
//      <View style={styles.container}>
//      <MapView
//         provider={PROVIDER_GOOGLE}
//         ref={map=>this._map = map}
//         showsUserLocation={true}
//         style={styles.map}
//         initialRegion={this.state.initialPosition}>
//             <Polygon 
//                coordinates={this.state.coordinates}
//                fillColor={'rgba(100,100,200,0.3)'}
//                strokeWidth={2}
//             />
//             <Marker
//               coordinate={{latitude: 9.004346, longitude:  38.766391}}
//              >
//               <Callout>
//                 <Text>An aianteresing City</Text>
//               </Callout>
//               {/* add image here to replace the marker with your image */}
//             </Marker>
//             {
//               this.state.coordinates.map(marker => (
//                 <Marker 
//                   key={marker.name}
//                   coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
//                   title={marker.name}
//                 >
//                    <Callout>
//                     <Text>{marker.name}</Text>
//                   </Callout>

//                 </Marker>
//               ))
//             }
//       </MapView>
//         {/* <Carousel
//               ref={(c) => { this._carousel = c; }}
//               data={this.state.coordinates}
//               containerCustomStyle={styles.carousel}
//               renderItem={this.renderCarouselItem}
//               sliderWidth={Dimensions.get('window').width}
//               itemWidth={300}
//             /> */}
//       </View>
//    );
// };

// export default ExploreScreen;

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject
//   },
//   map:{
//     ...StyleSheet.absoluteFillObject
//   },
//   carousel: {
//     position:'absolute',
//     bottom: 0,
//     marginBottom: 48
//   },
//   cardContainer: {
//      backgroungColor: 'rgba(0, 0, 0, 0.6)',
//      height: 200,
//      width:300,
//      padding:24,
//      borderRadius:24
//   },
//   cardTitle: {
//      color:'White',
//      fontSize:22,
//      alignSelf:"center"
//   },
//   cardImage: {
//       height:120,
//       width:300,
//       position:'absolute',
//       bottom: 0,
//       borderBottomLeftRadius:24,
//       borderBottomRightRadius:24
//   }
// })








// // third  demo 


// import React, { useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ScrollView,
//   Animated,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
// } from "react-native";
// import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
// import Geolocation from '@react-native-community/geolocation';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Fontisto from 'react-native-vector-icons/Fontisto';

// import { markers, mapDarkStyle, mapStandardStyle } from '../model/mapData';
// import StarRating from '../components/StarRating';

// import { useTheme } from '@react-navigation/native';

// const { width, height } = Dimensions.get("window");
// const CARD_HEIGHT = 200;
// const CARD_WIDTH = width * 0.8;
// const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

// const ExploreScreen = () => {
//   const theme = useTheme();

//   const initialMapState = {
//     markers,
//     region: {
//       latitude: 9.005401,
//       longitude: 38.763611,
//       latitudeDelta: 0.09,
//       longitudeDelta: 0.035,
//     },
   
//   };

//   const [state, setState] = React.useState(initialMapState);

//   let mapIndex = 0;
//   let mapAnimation = new Animated.Value(0);

//   useEffect(() => {
//     mapAnimation.addListener(({ value }) => {
//       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
//       if (index >= state.markers.length) {
//         index = state.markers.length - 1;
//       }
//       if (index <= 0) {
//         index = 0;
//       }

//       clearTimeout(regionTimeout);

//       const regionTimeout = setTimeout(() => {
//         if( mapIndex !== index ) {
//           mapIndex = index;
//           const { coordinate } = state.markers[index];
//           _map.current.animateToRegion(
//             {
//               ...coordinate,
//               latitudeDelta: state.region.latitudeDelta,
//               longitudeDelta: state.region.longitudeDelta,
//             },
//             350
//           );
//         }
//       }, 10);
//     });
//   });

//   const interpolations = state.markers.map((marker, index) => {
//     const inputRange = [
//       (index - 1) * CARD_WIDTH,
//       index * CARD_WIDTH,
//       ((index + 1) * CARD_WIDTH),
//     ];

//     const scale = mapAnimation.interpolate({
//       inputRange,
//       outputRange: [1, 1.5, 1],
//       extrapolate: "clamp"
//     });

//     return { scale };
//   });

//   const onMarkerPress = (mapEventData) => {
//     const markerID = mapEventData._targetInst.return.key;

//     let x = (markerID * CARD_WIDTH) + (markerID * 20); 
//     if (Platform.OS === 'ios') {
//       x = x - SPACING_FOR_CARD_INSET;
//     }

//     _scrollView.current.scrollTo({x: x, y: 0, animated: true});
//   }

//   const _map = React.useRef(null);
//   const _scrollView = React.useRef(null);

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={_map}
//         initialRegion={state.region}
//         showsUserLocation={true}
//         style={styles.container}
//         provider={PROVIDER_GOOGLE}
//         customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
//       >
//         {state.markers.map((marker, index) => {
//           const scaleStyle = {
//             transform: [
//               {
//                 scale: interpolations[index].scale,
//               },
//             ],
//           };
//           return (
//             <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}
//                 // ref={map=>this._map = map}
//                 showsUserLocation={true}
//                 // initialRegion={this.state.initialPosition}>
//             >
//                 <Animated.View style={[styles.markerWrap]}>
//                 <Animated.Image
//                   source={require('../assets/map_marker.png')}
//                   style={[styles.marker, scaleStyle]}
//                   resizeMode="cover"
//                 />
//               </Animated.View>
//             </MapView.Marker>
//           );
//         })}
//       </MapView>
//       <View style={styles.searchBox}>
//         <TextInput 
//           // placeholder="Search here"
//           placeholderTextColor="#000"
//           autoCapitalize="none"
//           style={{flex:1,padding:0}}
//         />
//         <Ionicons name="ios-search" size={20} />
//       </View>
//       {/* <ScrollView
//         horizontal
//         scrollEventThrottle={1}
//         showsHorizontalScrollIndicator={false}
//         height={50}
//         style={styles.chipsScrollView}
//         contentInset={{ // iOS only
//           top:0,
//           left:0,
//           bottom:0,
//           right:20
//         }}
//         contentContainerStyle={{
//           paddingRight: Platform.OS === 'android' ? 20 : 0
//         }}
//       >
//         {state.categories.map((category, index) => (
//           <TouchableOpacity key={index} style={styles.chipsItem}>
//             {category.icon}
//             <Text>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView> */}
//       <Animated.ScrollView
//         ref={_scrollView}
//         horizontal
//         pagingEnabled
//         scrollEventThrottle={1}
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={CARD_WIDTH + 20}
//         snapToAlignment="center"
//         style={styles.scrollView}
//         contentInset={{
//           top: 0,
//           left: SPACING_FOR_CARD_INSET,
//           bottom: 0,
//           right: SPACING_FOR_CARD_INSET
//         }}
//         contentContainerStyle={{
//           paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
//         }}
//         onScroll={Animated.event(
//           [
//             {
//               nativeEvent: {
//                 contentOffset: {
//                   x: mapAnimation,
//                 }
//               },
//             },
//           ],
//           {useNativeDriver: true}
//         )}
//       >
//         {state.markers.map((marker, index) =>(
//           <View style={styles.card} key={index}>
//             <Image 
//               source={marker.image}
//               style={styles.cardImage}
//               resizeMode="cover"
//             />
//             <View style={styles.textContent}>
//               <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
//               <StarRating ratings={marker.rating} reviews={marker.reviews} />
//               <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
//               <View style={styles.button}>
//                 <TouchableOpacity
//                   onPress={() => {}}
//                   style={[styles.signIn, {
//                     borderColor: '#FF6347',
//                     borderWidth: 1
//                   }]}
//                 >
//                   <Text style={[styles.textSign, {
//                     color: '#FF6347'
//                   }]}>Call Now</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </Animated.ScrollView>
//     </View>
//   );
// };

// export default ExploreScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   searchBox: {
//     position:'absolute', 
//     marginTop: Platform.OS === 'ios' ? 40 : 20, 
//     flexDirection:"row",
//     backgroundColor: '#fff',
//     width: '90%',
//     alignSelf:'center',
//     borderRadius: 5,
//     padding: 10,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   chipsScrollView: {
//     position:'absolute', 
//     top:Platform.OS === 'ios' ? 90 : 80, 
//     paddingHorizontal:10
//   },
//   chipsIcon: {
//     marginRight: 5,
//   },
//   chipsItem: {
//     flexDirection:"row",
//     backgroundColor:'#fff', 
//     borderRadius:20,
//     padding:8,
//     paddingHorizontal:20, 
//     marginHorizontal:10,
//     height:35,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   scrollView: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//   },
//   endPadding: {
//     paddingRight: width - CARD_WIDTH,
//   },
//   card: {
//     // padding: 10,
//     elevation: 2,
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: "hidden",
//   },
//   cardImage: {
//     flex: 3,
//     width: "100%",
//     height: "100%",
//     alignSelf: "center",
//   },
//   textContent: {
//     flex: 2,
//     padding: 10,
//   },
//   cardtitle: {
//     fontSize: 12,
//     // marginTop: 5,
//     fontWeight: "bold",
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: "#444",
//   },
//   markerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//     width:50,
//     height:50,
//   },
//   marker: {
//     width: 30,
//     height: 30,
//   },
//   button: {
//     alignItems: 'center',
//     marginTop: 5
//   },
//   signIn: {
//       width: '100%',
//       padding:5,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 3
//   },
//   textSign: {
//       fontSize: 14,
//       fontWeight: 'bold'
//   }
// });




// //4th demo

// import React, { useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ScrollView,
//   Animated,
//   Image,
//   Alert,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
// } from "react-native";
// import {request, PERMISSIONS} from 'react-native-permissions';
// import MapView, {PROVIDER_GOOGLE,Marker, Callout,Polygon} from "react-native-maps";
// import Geolocation from '@react-native-community/geolocation';

// import Carousel from 'react-native-snap-carousel';

// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import Fontisto from 'react-native-vector-icons/Fontisto';

// import { coordinates, mapDarkStyle, mapStandardStyle } from '../model/mapData';
// import StarRating from '../components/StarRating';

// import { useTheme } from '@react-navigation/native';



// const ExploreScreen = () => {
// const theme = useTheme();
//   const state={
//     // coordinates,
//     coordinates:[
//       { name:'1', latitude:38.766594, longitude: 8.999166 },
//       { name:'2', latitude:38.758594, longitude: 9.005286 },
//       { name:'3', latitude:38.768414, longitude: 8.993119 },
//       { name:'4', latitude:38.761834, longitude:  8.992297 },
//       { name:'5', latitude:38.746615, longitude: 9.009756 },
//     ]
//   }
// //    const initialMapState = {
// //     coordinates,
// //     initialRegion: {
// //           latitude: position.coords.latitude,
// //           longitude:position.coords.longitude,
// //           latitudeDelta:0.09,
// //           longitudeDelta:0.035
// //         }
// //   };
// // const [state, setState] = React.useState(initialMapState);

//   useEffect(() => {
//   this.requestLocationPermission();
//    }, []);

//   // componentDidMount(){
//   //   this.requestLocationPermission();
//   // }

//   requestLocationPermission = async () => {
//     if(Platform === 'ios'){
//       var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//       // console.log('iphone:'+response);

//       if(response === 'granted'){
//         this.locateCurrentPosition();
//       }
//     }else{
//       var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       // console.log('Android:'+response);
//         if(response === 'granted'){
//         this.locateCurrentPosition();
//       }
//     }
//   }
//   locateCurrentPosition = ()=>{
//     Geolocation.getCurrentPosition(
//       position => {
//         // console.log(JSON.stringify(position));

//         let initialRegion = {
//           latitude: position.coords.latitude,
//           longitude:position.coords.longitude,
//           latitudeDelta:0.09,
//           longitudeDelta:0.035
//         }

//         this.setState({initialRegion})
//       },
//       error=>Alert.alert(error.message),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
//      )
//   } 
//   // renderCarouselItem = (item) => {
//   //    <View style={styles.cardContainer}>
//   //      <Text style={styles.cardTitle}>{item.name}</Text>
//   //      <Image style={styles.cardImage}source={item.image} />
//   //    </View>
//   // }
//    return (
//      <View style={styles.container}>
//      <MapView
//         provider={PROVIDER_GOOGLE}
//         ref={map=>this._map = map}
//         showsUserLocation={true}
//         style={styles.map}
//         initialRegion={this.state.initialPosition}>
//             <Polygon 
//                coordinates={this.state.coordinates}
//                fillColor={'rgba(100,100,200,0.3)'}
//                strokeWidth={2}
//             />
//             <Marker
//               coordinate={{latitude: 9.004346, longitude:  38.766391}}
//              >
//               <Callout>
//                 <Text>An aianteresing City</Text>
//               </Callout>
//               {/* add image here to replace the marker with your image */}
//             </Marker>
//             {
//               this.state.coordinates.map(marker => (
//                 <Marker 
//                   key={marker.name}
//                   coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
//                   title={marker.name}
//                 >
//                    <Callout>
//                     <Text>{marker.name}</Text>
//                   </Callout>

//                 </Marker>
//               ))
//             }
//       </MapView>
//         {/* <Carousel
//               ref={(c) => { this._carousel = c; }}
//               data={this.state.coordinates}
//               containerCustomStyle={styles.carousel}
//               renderItem={this.renderCarouselItem}
//               sliderWidth={Dimensions.get('window').width}
//               itemWidth={300}
//             /> */}
//       </View>
//    );
// };

// export default ExploreScreen;

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject
//   },
//   map:{
//     ...StyleSheet.absoluteFillObject
//   },
//   carousel: {
//     position:'absolute',
//     bottom: 0,
//     marginBottom: 48
//   },
//   cardContainer: {
//      backgroungColor: 'rgba(0, 0, 0, 0.6)',
//      height: 200,
//      width:300,
//      padding:24,
//      borderRadius:24
//   },
//   cardTitle: {
//      color:'White',
//      fontSize:22,
//      alignSelf:"center"
//   },
//   cardImage: {
//       height:120,
//       width:300,
//       position:'absolute',
//       bottom: 0,
//       borderBottomLeftRadius:24,
//       borderBottomRightRadius:24
//   }
// })
 






import React,{Component, useEffect} from 'react';

  import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Animated,
    Image,
    Alert,
    TouchableOpacity,
    Dimensions,
    Platform,
  } from "react-native";
import MapView,{ PROVIDER_GOOGLE, Marker, Callout,Polygon} from "react-native";
import Geolocation from '@react-native-community/geolocation';

import {request, PERMISSIONS} from 'react-native-permissions';

import { coordinates, mapDarkStyle, mapStandardStyle } from '../model/mapData'; 
import StarRating from '../components/StarRating';

export default class ExploreScreen extends Component{
   static navigationOptions = {
     title:'Addid Abeba',
   };
   
  state = {
    coordinates:[
      { name:"AACRA Garage", latitude:38.766594, longitude: 8.999166,image:require("../assets/banners/garage-banner1.jpg") },
      { name:"Dereje Garage", latitude:38.758594, longitude: 9.005286,image:require("../assets/banners/garage-banner2.jpg") },
      { name:"Teshale wondemu garage", latitude:38.768414, longitude: 8.993119,image:require("../assets/banners/garage-banner3.jpg") },
      { name:"Ibrahim atoz garage", latitude:38.761834, longitude: 8.992297,image:require("../assets/banners/garage-banner4.jpg") },
      { name:"Abdu garage", latitude:38.746615, longitude: 9.009756,image:require("../assets/banners/garage-banner2.jpg") },
    ]
   }
   showWelcomeMsg = ()=>{
     Alert.alert(
       'Welcome',
       'enjoy your stay',
       [
         { 
           text:'cancel',
         style:'cancel'
        },
         { 
           text:'Ok',
          }
        ]
        )
      }
      componentDidMount(){
        this.requestLocationPermission();
      }
        // useEffect(() => {
        //     requestLocationPermission();
        //     }, []);
      requestLocationPermission = async () => {
          if(Platform.OS === 'ios'){
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            // console.log('iphone:'+response);

            if(response === 'granted'){
              this.locateCurrentPosition();
            }  
          }else{
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            // console.log('Android:'+response);
              if(response === 'granted'){
              this.locateCurrentPosition();
            }
          }
        }
          locateCurrentPosition = ()=>{
          navigator.geolocation.getCurrentPosition(position=>{
              this.setState({
              latitude: position.coords.latitude, 
              longitude: position.coords.longitude,
              error:null
              });
            },
          error=>this.setState({error:error.message}),
          {enableHighAccuracy:true,timeout:20000,maximumAge: 1000}
        );
      }
      locateCurrentPosition = ()=>{
        // Geolocation.getCurrentPosition(
        // position=>{
        //     this.setState
        //     // console.log(JSON.stringify(position));

        //     let initialRegion = {
        //       latitude: position.coords.latitude,
        //       longitude:position.coords.longitude,
        //       latitudeDelta:0.09,
        //       longitudeDelta:0.035
        //     }

        //     this.setState({initialRegion})
        //   },
        //   error=>this.setState({error:error.message}),
        //   { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        // )
            navigator.geolocation.getCurrentPosition(position=>{
              this.setState({
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude,
            error:null
            });
     },
      error=>this.setState({error:error.message}),
      {enableHighAccuracy:true,timeout:20000}
     );
  } 
      
      componentDidMount(){
        navigator.geolocation.getCurrentPosition(position=>{
          this.setState({
         latitude: position.coords.latitude, 
         longitude: position.coords.longitude,
         error:null
        });
     },
      error=>this,setState({error:error.message}),
      {enableHighAccuracy:true,timeout:20000}
     );
   }
  render(){
    return(
      <View style={styles.container}>
      <MapView
         provider={PROVIDER_GOOGLE}
         ref={map=>this._map = map}
         showsUserLocation={true}
         style={styles.map}
         initialRegion={this.state.initialPosition}
        >
      <Polygon 
            coordinates={this.state.coordinates}
            fillColor={'rgba(100,100,200,0.3)'}
            strokeWidth={2}
        />
        <Marker 
          draggable
          coordinate={{latitude: 9.004346, longitude:38.766391}}>
          <Callout onPress={this.showWelcomeMsg}>
             <Text>Admas University</Text>
              
                
          </Callout>  
        </Marker>
 {
              this.state.coordinates.map(marker => (
                <Marker 
                  key={marker.name}
                  coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                  title={marker.name}
                >
                   <Callout>
                    <Text>{marker.name}</Text>
                    <Image>{marker.image}</Image>
                    <TouchableOpacity
                         onPress={() => {}}
                         style={[styles.signIn, {
                          borderColor: '#FF6347',
                          borderWidth: 1
                        }]}
                      >
                        <Text style={[styles.textSign, {
                          color: '#FF6347'
                        }]}>Call Now</Text>
                     </TouchableOpacity>
                  </Callout>

                </Marker>
              ))
            }
        </MapView> 
      
      </View>
    );
  }
};

// const styles =  StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject
//   },
//   map:{
//     ...StyleSheet.absoluteFillObject
//   },
//  signIn: {
//       width: '100%',
//       padding:5,
//       borderRadius: 3,
//       justifyContent: 'center',
//       alignItems: 'center',
//   },
// )};
const styles = StyleSheet.create({
 
 container: {
    ...StyleSheet.absoluteFillObject
  },
  map:{
    ...StyleSheet.absoluteFillObject
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  }
 });







