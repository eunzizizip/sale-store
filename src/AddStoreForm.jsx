import React, { useState } from 'react';
import axios from 'axios';

const AddStoreForm = ({ onAddStore }) => {
    const [name, setName] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [originalPrice, setOriginalPrice] = useState(''); // 원래 가격 필드
    const [discountedPrice, setDiscountedPrice] = useState(''); // 할인된 가격 필드
    const [pickupTime, setPickupTime] = useState('');
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 서버로 전송할 매장 정보 객체
        const newStore = {
            name,
            location: { lat: parseFloat(lat), lng: parseFloat(lng) },
            originalPrice: parseFloat(originalPrice), // 숫자 형식으로 변환
            discountedPrice: parseFloat(discountedPrice), // 숫자 형식으로 변환
            pickupTime,
            address,
            imageUrl
            
        };

        try {
            // 서버로 POST 요청을 보내서 매장 정보를 저장
            await axios.post('http://localhost:5002/api/stores', newStore);
            alert('매장 정보가 성공적으로 추가되었습니다!');
            onAddStore(newStore);
        } catch (error) {
            console.error('매장 정보 추가 실패:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Store Name" required />
            <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" required />
            <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" required />
            <input type="text" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="Original Price" required /> {/* 원래 가격 입력 */}
            <input type="text" value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} placeholder="Discounted Price" required /> {/* 할인된 가격 입력 */}
            <input type="text" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} placeholder="Pickup Time" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
            <button type="submit">Add Store</button>
        </form>
    );
};

export default AddStoreForm;
