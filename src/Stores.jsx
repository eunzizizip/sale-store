const stores = [
    { 
        id: 1, 
        name: "제이스 베이커리", 
        location: { lat: 37.547948, lng: 126.918899 }, 
        originalPrice: "₩15,000",  // 원래 가격
        discountedPrice: "₩7,400",  // 할인된 가격
        pickupTime: "21:50 - 22:20", 
        address: "서울특별시 마포구 독막로 50 1층", 
        imageUrl: "https://example.com/image1.jpg"
    },
];

export default stores; // 데이터를 다른 파일에서 사용할 수 있도록 내보내기
