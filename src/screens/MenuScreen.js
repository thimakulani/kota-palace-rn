import {NavigationContainer} from "@react-navigation/native";
import {FlatList, Image, SafeAreaView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../data/configs";
import home_style from "../stylesheet/home_style";
import {Chip} from "react-native-paper";



function MenuScreen({ route, navigation })
{
    const { _id } = route.params;
    const [menuItem, setMenuItem] = useState([]);
    const [business, setBusiness] = useState();
    const fetchMenu = () => {
        axios.get(`${BASE_URL}/businesses/buss_menu/${_id}`)
            .then((response)=>{
                //console.warn(response.data.business);
                if(response.data)
                {
                    setMenuItem(response.data.menu);
                    setBusiness(response.data.business);

                }
                else {
                    setMenuItem([]);
                    setBusiness('');
                }
                //console.warn(response.data.menu);

            });
    }
    useEffect(()=>
    {
        fetchMenu();
    },[])

    const getStatus = (status) => {
        if(status)
        {
            return 'Available';
        }
        return 'Not Available';
    };


    const ExtraItem = ({item}) => {
        return (

               <Text style={{backgroundColor:'#ffffff', margin:3, flexDirection:"row" , padding:5, borderRadius:29}}>{item.title} </Text>


        );
    }

    const renderMenu = ({item}) => {
      return(
          <View style={home_style.flat_list_item}>
              <View>
                  <Image style={{height: 250, width: null, flex:1, opacity:0.5}}
                        source={{uri: item.url}}

                  />
              </View>
              <View style={{margin:5}}>
                  <Text style={{color: '#ffffff'}}> {item.name} </Text>
                  <Text style={{color: '#ffffff'}}> R{item.price} </Text>
                  <Text style={{color: '#ffffff'}}> {getStatus(item.status)} </Text>
                  <FlatList data={item.extras}
                            keyExtractor={p=>p.id}
                            renderItem={ExtraItem}
                            style={{ flexWrap: 'wrap', }}
                            contentContainerStyle={{alignItems: 'flex-start'}}
                            horizontal={true}
                  />

              </View>
          </View>
      )
    }
    return(
            <SafeAreaView>
                <View>
                    <Text>

                    </Text>
                </View>
                <FlatList

                    data={menuItem}
                    renderItem={renderMenu}
                    keyExtractor={p=>p.id}
                />

            </SafeAreaView>

    )
}
export default MenuScreen;