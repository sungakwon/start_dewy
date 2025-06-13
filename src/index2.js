// Supabase 클라이언트 초기화
import { supabase } from './supabase-client.js';

// 폼 요소들 초기화
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const paymentMethodInputs = document.querySelectorAll('input[name="payment_method"]');
const submitButton = document.querySelector('button[type="submit"]');

// 결제 완료 모달 관련 DOM 요소
const paymentCompleteModal = document.getElementById('paymentCompleteModal');
const closeModalButton = document.getElementById('closeModalButton');
const closeButton = paymentCompleteModal.querySelector('.close-button');

// GA4 이벤트 추적 함수
function trackBuyNowClick() {
    gtag('event', 'click', {
        'event_category': 'purchase_flow',
        'event_label': 'buy_now_clicked',
        'event_action': 'click'
    });
}

function trackPaymentClick() {
    gtag('event', 'click', {
        'event_category': 'purchase_flow',
        'event_label': 'payment_clicked',
        'event_action': 'click'
    });
}

// 결제 완료 모달 닫기 함수
function closeModal() {
    paymentCompleteModal.classList.remove('show');
}

closeModalButton.addEventListener('click', closeModal);
closeButton.addEventListener('click', closeModal);

// 버튼 초기 상태 설정
submitButton.disabled = true;

// 바로 구매하기 버튼 이벤트
const buyNowButton = document.querySelector('.hero-section .cta-button');
const orderForm = document.getElementById('orderForm');

buyNowButton.addEventListener('click', (e) => {
    e.preventDefault();
    trackBuyNowClick();
    orderForm.scrollIntoView({ behavior: 'smooth' });
});

// 폼 입력 검증 함수
function validateForm() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const paymentMethod = Array.from(paymentMethodInputs).find(input => input.checked);

    // 모든 필드가 채워져 있는지 확인
    if (name && phone && address && paymentMethod) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// 입력값 변경 감지 이벤트 리스너
nameInput.addEventListener('input', validateForm);
phoneInput.addEventListener('input', validateForm);
addressInput.addEventListener('input', validateForm);

// 결제 수단 변경 감지
paymentMethodInputs.forEach(input => {
    input.addEventListener('change', validateForm);
});

// 폼 제출 처리
orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // GA4 이벤트 추적
    trackPaymentClick();

    try {
        // 폼 데이터 수집
        const formData = {
            name: nameInput.value,
            phone: phoneInput.value,
            address: addressInput.value,
            payment_method: document.querySelector('input[name="payment_method"]:checked').value
        };

        const { data, error } = await supabase
            .from('delivery_info')
            .insert([{
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                payment_method: formData.payment_method
            }])
            .select();

        if (error) throw error;

        // 데이터 저장 성공 시 모달 표시
        paymentCompleteModal.classList.add('show');
        
        // 3초 후 자동으로 모달 닫기
        setTimeout(closeModal, 3000);

        // 폼 초기화
        orderForm.reset();
        submitButton.disabled = true; // 폼 초기화 후 버튼 비활성화

    } catch (error) {
        console.error('Supabase 데이터 저장 중 오류:', error);
        alert('주문 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
});