// 사용자 식별자 관리
// export const CART_TABLE = 'cart_items';
// export const getUserId = () => {
//     // 실제 로그인 시스템이 있다면 여기서 사용자 ID를 반환하도록 수정해야 함
//     return 'anonymous_user';
// };

import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);