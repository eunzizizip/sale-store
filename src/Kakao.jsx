import React, {useEffect} from "react";
import { useLocation } from 'react-router-dom';


const{kakao} = window;

function Kakao(){
    const location = useLocation();
    const stores = location.state?.stores || []; // 매장 리스트를 받아옴


    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.547726, 126.923033),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        stores.forEach(store => {
            const markerPosition = new kakao.maps.LatLng(store.lat, store.lng);
            const marker = new kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map);

            const infowindow = new kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${store.name}</div>`
            });
            kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
            kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
        });

    }, [stores])

    return (
        <div id = "map" style = {{
            width: '500px',
            height: '500px'
        }}> </div>
    )
}

export default Kakao;