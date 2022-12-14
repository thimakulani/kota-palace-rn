import {FlatList, Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import {Searchbar, Text} from "react-native-paper";
import axios from "axios";
import {BASE_URL} from "../data/configs";
import {useEffect, useState} from "react";
import home_style from "../stylesheet/home_style";

import * as Location from 'expo-location';

function HomeScreen({navigation})
{
    const [Items, setItems] = useState([]);
    const [currentLocation, setCurrentLocation] = useState();
    const [connected, setConnected] = useState();
    const fetchData = ()=>
    {
        axios.get(BASE_URL+'/businesses')
            .then((response)=>
            {
                if(response.data.length>0)
                {
                    setItems(response.data);
                }
                else {
                    setItems([]);
                }
            }).catch((error)=>
            {

            });
    }

    const getLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted')
        {
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location);
        }
    }
    useEffect( () => {
        getLocation().then(r => {});
    },[0]);
    useEffect(()=>{
        fetchData();
    },[0]);

    const ItemSelected = ({id}) => {
        navigation.navigate('SpazaMain', {_id:id});
    };

    function getDistance(coordinates) {
        var data = coordinates.split('/');
        return data[0] +'/ '+ data[1];
    }

    const RanderItems = ({item})=>{
        return(
            <TouchableOpacity onPress={()=>ItemSelected(item) } >
                <View style={home_style.flat_list_item}>
                    <View style={{margin:5}}>
                        <Text style={home_style.item_text_color} >{item.businessName}</Text>
                    </View>
                    <Image
                        style={home_style.item_img}
                        source={{uri:item.imgUrl}}
                        //source={{uri: item.uri}}
                    />
                    <View style={{margin:5}}>

                        <Text style={home_style.item_text_color} >{item.onlineStatus}</Text>
                        <Text style={home_style.item_text_color} >{item.businessAddress}</Text>
                        <Text style={home_style.item_text_color} >{getDistance(item.coordinates)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return(
        <SafeAreaView style={home_style.container}>
            <Searchbar
                style={{margin:5}}
                placeholder="Search here.."
            />
            <FlatList data={Items} renderItem={RanderItems} keyExtractor={p=>p.id}

            />

        </SafeAreaView>
    );
}
export default HomeScreen;