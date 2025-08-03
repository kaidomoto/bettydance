import React, { useState, useEffect } from "react";
import { useTranslation } from 'next-i18next';

const ADMIN_PASSWORD = "smgo";
const USER_PASSWORD = "Yeah";

type Props = {
  onAuth: (role: "admin" | "user") => void;
};

const PasswordGate: React.FC<Props> = ({ onAuth }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    // 自动登录（localStorage）
    const role = localStorage.getItem("bettydance_role");
    if (role === "admin" || role === "user") {
      onAuth(role as "admin" | "user");
    }
  }, [onAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // 添加一个小延迟来展示加载效果
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem("bettydance_role", "admin");
      onAuth("admin");
    } else if (input === USER_PASSWORD) {
      localStorage.setItem("bettydance_role", "user");
      onAuth("user");
    } else {
      setError(t('wrong_password'));
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      background: "url(/rabbit-bg.jpg) center/cover, linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
      backgroundBlendMode: 'overlay',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px"
    }}>
      {/* 主容器 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(200, 200, 200, 0.2)',
        textAlign: 'center',
        maxWidth: '350px',
        width: '90%',
        backdropFilter: 'blur(8px)'
      }}>
        {/* Logo和标题 */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontWeight: '700',
            fontSize: '2rem',
            color: '#2d3748',
            letterSpacing: '0.5px',
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            margin: '0 0 8px 0'
          }}>
            Betty Dance
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '14px',
            margin: '0',
            fontWeight: '500'
          }}>
            Booking System
          </p>
        </div>

        {/* 表单 */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            color: '#4a5568',
            fontSize: '1.4rem',
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            {t('enter_password')}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type="password"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('password_placeholder')}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#805ad5'
                  e.target.style.boxShadow = '0 0 0 3px rgba(128, 90, 213, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                background: isLoading || !input.trim() 
                  ? '#a0aec0' 
                  : '#805ad5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && input.trim()) {
                  e.currentTarget.style.background = '#6b46c1'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && input.trim()) {
                  e.currentTarget.style.background = '#805ad5'
                }
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  Loading...
                </span>
              ) : (
                t('enter')
              )}
            </button>
          </form>
        </div>

        {/* 错误信息 */}
        {error && (
          <div style={{ 
            color: "#e53e3e", 
            background: 'rgba(229, 62, 62, 0.1)',
            border: '1px solid rgba(229, 62, 62, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}
      </div>

      {/* 添加旋转动画的CSS */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PasswordGate; 