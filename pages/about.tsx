import React, { useState } from "react";
import PasswordGate from "../components/PasswordGate";
import NavBar from "../components/NavBar";
import WelcomeMessage from "../components/WelcomeMessage";
import { useTranslation } from 'next-i18next';

export default function About() {
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const { t } = useTranslation('common');

  if (!role) {
    return <PasswordGate onAuth={setRole} />;
  }

  return (
    <div style={{
      background: 'url(/rabbit-bg.jpg) center/cover, linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
      backgroundBlendMode: 'overlay',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <NavBar />
      
      {/* 欢迎信息 */}
      <WelcomeMessage role={role} />
      
      <div style={{ 
        maxWidth: 1000, 
        margin: '0 auto', 
        padding: '40px 20px',
        color: '#2d3748'
      }}>
        
        {/* 主标题区域 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}>
            {t('title')}
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#718096',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {t('relaxed_free')}
          </p>
        </div>

        {/* 核心特色区域 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          
          {/* 目标对象 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              color: '#805ad5',
              fontSize: '1.4rem',
              fontWeight: '600',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
                             <span style={{ fontSize: '1.2rem' }}>🎯</span>
               {t('suitable_for_you')}
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('like_dancing')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('want_exercise_social')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('expand_possibilities')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('multilingual_users')}</span>
              </li>
            </ul>
          </div>

          {/* 社区特色 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              color: '#805ad5',
              fontSize: '1.4rem',
              fontWeight: '600',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              {t('community_features')}
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('beginner_friendly')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('freedom_relaxation')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('trilingual_support')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('comfortable_private')}</span>
              </li>
            </ul>
          </div>

          {/* 核心业务 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              color: '#805ad5',
              fontSize: '1.4rem',
              fontWeight: '600',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>💃</span>
              {t('core_courses')}
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('one_half_hour')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('warmup_basic')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('suitable_beginners')}</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5', fontSize: '0.9rem' }}>•</span>
                <span>{t('encourage_expression')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 社区理念 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(10px)',
          marginBottom: '40px'
        }}>
                      <h2 style={{
              color: '#2d3748',
              fontSize: '1.8rem',
              fontWeight: '600',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              {t('our_philosophy')}
            </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '12px'
              }}>🤝</div>
              <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>{t('companionship_title')}</h4>
              <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                {t('companionship_desc')}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '12px'
              }}>🧘</div>
              <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>{t('physical_practice_title')}</h4>
              <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                {t('physical_practice_desc')}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '12px'
              }}>🛡️</div>
              <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>{t('safe_space_title')}</h4>
              <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                {t('safe_space_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* 重要说明 */}
        <div style={{
          background: 'rgba(128, 90, 213, 0.08)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(128, 90, 213, 0.2)',
          marginBottom: '40px'
        }}>
          <h3 style={{
            color: '#805ad5',
            fontSize: '1.2rem',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>ℹ️</span>
            {t('important_notice_title')}
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            color: '#4a5568',
            fontSize: '0.9rem',
            lineHeight: '1.6'
          }}>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#805ad5' }}>•</span>
              <span>{t('non_commercial_policy')}</span>
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#805ad5' }}>•</span>
              <span>{t('cost_coverage')}</span>
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#805ad5' }}>•</span>
              <span>{t('health_disclaimer')}</span>
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#805ad5' }}>•</span>
              <span>{t('multilingual_environment')}</span>
            </li>
          </ul>
        </div>

        {/* 联系信息 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#2d3748',
            fontSize: '1.4rem',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            {t('join_us_title')}
          </h3>
          <p style={{
            color: '#718096',
            fontSize: '1rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {t('join_us_description')}
          </p>
        </div>

      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const { serverSideTranslations } = require('next-i18next/serverSideTranslations')
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
} 