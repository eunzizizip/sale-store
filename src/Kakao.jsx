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
        const geocoder = new kakao.maps.services.Geocoder(); // Geocoder 객체 생성

        stores.forEach(store => {
            // 주소를 좌표로 변환
            geocoder.addressSearch(store.address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 마커 생성
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });


                    const infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;">${store.name}</div>`
                    });

                    // 마커 이벤트 추가
                    kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
                    kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
                } else {
                    console.error(`Failed to search address: ${store.address}`);
                }
            });
        });
        
    }, [stores])

    return (
        <div id = "map" style = {{
            width: '1500px',
            height: '500px'
        }}> </div>
    )
}

export default Kakao;