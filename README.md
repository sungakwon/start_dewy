**A/B 테스트를 위한 웹사이트 생성**

듀이트리 AC 라인 마스크팩 제품을 대상으로, 두 가지 마케팅 메시지 전략(A/B 버전)이 사용자 행동에 미치는 영향 비교
A버전 가격 강조형
B버전 할인 강조형

**사용자 행동 수집 방식**
A/B 버전 랜덤 노출: index.html에서 JS를 통해 랜덤하게 index1.html 또는 index2.html로 자동 이동

- 구매 행동 추적
 결제하기 버튼 클릭 여부

- Supabase와 웹 연동
 구매 시 입력된 사용자 배송 정보 저장

- 수집한 데이터 항목
 id: 각 기록을 고유하게 구분하기 위해 사용
 name, phone, address: 실제 구매 의사 확인을 위한 기본 배송 정보
 payment_method: 사용자 결제 수단 선호도 분석을 위해 수집

- 수집 데이터 자료
![supabase](https://github.com/user-attachments/assets/fcae78dd-7ff7-4ec8-846c-e08bce4411c0)

**배포주소**
https://courageous-malabi-8decc7.netlify.app


