import {Platform, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
const home_style = StyleSheet.create({
    container: {
        flex: 1,
    },
    flat_list_item: {
        margin:5,
        borderRadius:5,
        backgroundColor: '#69706f',
        elevation: 5
    },
    item_img: {
        height: 250,
        flex: 1,
        width: null,
        opacity: 0.3
    },
    item_text_color:{
        color: '#ffffff'
    }

});
export default home_style;

