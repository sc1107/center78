import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

// 서비스 워커 업데이트 시 자동 리로드 (모바일 흰 화면 방지)
registerSW({
  onNeedRefresh() {
    // 새 버전 감지 즉시 리로드
    window.location.reload();
  },
  onOfflineReady() {
    console.log('[center78] 오프라인 준비 완료');
  },
  onRegisteredSW(swUrl, r) {
    // 주기적으로 SW 업데이트 확인 (1시간마다)
    if (r) {
      setInterval(() => { r.update(); }, 60 * 60 * 1000);
    }
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
