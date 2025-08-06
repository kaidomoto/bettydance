import React, { useState } from "react";
import PasswordGate from "../components/PasswordGate";
import NavBar from "../components/NavBar";
import { useTranslation } from 'next-i18next';

export default function Price() {
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
            {t('course_fees')}
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#718096',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {t('transparent_pricing')}
          </p>
        </div>

        {/* 常规课程费用 */}
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
            marginBottom: '32px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>💃</span>
            {t('regular_course')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            
            {/* 私教 */}
            <div style={{
              background: 'linear-gradient(135deg, #805ad5, #6b46c1)',
              borderRadius: '12px',
              padding: '32px',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
                             <div style={{
                 position: 'absolute',
                 top: '12px',
                 right: '12px',
                 background: 'rgba(255, 255, 255, 0.2)',
                 borderRadius: '20px',
                 padding: '4px 12px',
                 fontSize: '0.8rem',
                 fontWeight: '500'
               }}>
                 {t('private_lesson')}
               </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                ¥5,000
              </h3>
                             <p style={{
                 fontSize: '1rem',
                 opacity: '0.9',
                 marginBottom: '16px'
               }}>
                 {t('one_person')}
               </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left',
                fontSize: '0.9rem',
                opacity: '0.9'
              }}>
                                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('personalized_guidance')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('focused_practice')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('flexible_scheduling')}</span>
                 </li>
              </ul>
            </div>

            {/* 小班 */}
            <div style={{
              background: 'rgba(237, 242, 247, 0.8)',
              borderRadius: '12px',
              padding: '32px',
              border: '2px solid #805ad5',
              textAlign: 'center'
            }}>
                             <div style={{
                 position: 'absolute',
                 top: '12px',
                 right: '12px',
                 background: '#805ad5',
                 color: 'white',
                 borderRadius: '20px',
                 padding: '4px 12px',
                 fontSize: '0.8rem',
                 fontWeight: '500'
               }}>
                 {t('recommended')}
               </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '8px',
                color: '#2d3748'
              }}>
                ¥3,000
              </h3>
                             <p style={{
                 fontSize: '1rem',
                 color: '#718096',
                 marginBottom: '16px'
               }}>
                 {t('two_three_person')}
               </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left',
                fontSize: '0.9rem',
                color: '#4a5568'
              }}>
                                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span style={{ color: '#805ad5' }}>✓</span>
                   <span>{t('interactive_learning')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span style={{ color: '#805ad5' }}>✓</span>
                   <span>{t('high_value')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span style={{ color: '#805ad5' }}>✓</span>
                   <span>{t('social_experience')}</span>
                 </li>
              </ul>
            </div>

            {/* 团体 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '8px',
                color: '#2d3748'
              }}>
                ¥2,500
              </h3>
                             <p style={{
                 fontSize: '1rem',
                 color: '#718096',
                 marginBottom: '16px'
               }}>
                 {t('four_plus_person')}
               </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left',
                fontSize: '0.9rem',
                color: '#4a5568'
              }}>
                                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span style={{ color: '#805ad5' }}>✓</span>
                   <span>{t('best_price')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span style={{ color: '#805ad5' }}>✓</span>
                   <span>{t('lively_atmosphere')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span style={{ color: '#805ad5' }}>✓</span>
                   <span>{t('team_cooperation')}</span>
                 </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 特别课程 */}
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
            marginBottom: '32px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>⭐</span>
            {t('special_course')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            
            <div style={{
              background: 'linear-gradient(135deg, #f6ad55, #ed8936)',
              borderRadius: '12px',
              padding: '32px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                ¥3,500
              </h3>
                             <p style={{
                 fontSize: '1rem',
                 opacity: '0.9',
                 marginBottom: '16px'
               }}>
                 {t('two_hour_special')}
               </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left',
                fontSize: '0.9rem',
                opacity: '0.9'
              }}>
                                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('idol_dance_teaching')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('monthly_2_3_times')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('deep_practice')}</span>
                 </li>
              </ul>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f6ad55, #ed8936)',
              borderRadius: '12px',
              padding: '32px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                ¥4,250
              </h3>
                             <p style={{
                 fontSize: '1rem',
                 opacity: '0.9',
                 marginBottom: '16px'
               }}>
                 {t('two_half_hour_special')}
               </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left',
                fontSize: '0.9rem',
                opacity: '0.9'
              }}>
                                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('idol_dance_teaching')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('monthly_2_3_times')}</span>
                 </li>
                 <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span>✓</span>
                   <span>{t('extended_practice')}</span>
                 </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 优惠活动 */}
        <div style={{
          background: 'rgba(128, 90, 213, 0.08)',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid rgba(128, 90, 213, 0.2)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            color: '#805ad5',
            fontSize: '1.8rem',
            fontWeight: '600',
            marginBottom: '32px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎁</span>
            {t('referral_benefits')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(128, 90, 213, 0.3)'
            }}>
                             <h3 style={{
                 color: '#805ad5',
                 fontSize: '1.2rem',
                 fontWeight: '600',
                 marginBottom: '12px',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 <span>👥</span>
                 {t('newcomer_discount')}
               </h3>
               <p style={{
                 color: '#4a5568',
                 fontSize: '0.95rem',
                 lineHeight: '1.6'
               }}>
                 {t('newcomer_discount_desc')}
               </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(128, 90, 213, 0.3)'
            }}>
                             <h3 style={{
                 color: '#805ad5',
                 fontSize: '1.2rem',
                 fontWeight: '600',
                 marginBottom: '12px',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 <span>💎</span>
                 {t('introducer_reward')}
               </h3>
               <p style={{
                 color: '#4a5568',
                 fontSize: '0.95rem',
                 lineHeight: '1.6'
               }}>
                 {t('introducer_reward_desc')}
               </p>
            </div>

          </div>
        </div>

        {/* 支付方式 */}
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
            marginBottom: '32px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>💳</span>
            {t('payment_methods')}
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 24px',
              background: 'rgba(237, 242, 247, 0.8)',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '1.5rem' }}>📱</span>
              <span style={{ color: '#4a5568', fontWeight: '500' }}>PayPay</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 24px',
              background: 'rgba(237, 242, 247, 0.8)',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '1.5rem' }}>💴</span>
              <span style={{ color: '#4a5568', fontWeight: '500' }}>{t('cash')}</span>
            </div>
          </div>
          
                     <p style={{
             textAlign: 'center',
             color: '#718096',
             fontSize: '0.9rem',
             marginTop: '24px',
             fontStyle: 'italic'
           }}>
             {t('same_day_payment')}
           </p>
        </div>

        {/* 重要说明 */}
        <div style={{
          background: 'rgba(128, 90, 213, 0.08)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(128, 90, 213, 0.2)'
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
             {t('important_notice')}
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
               <span>{t('non_commercial')}</span>
             </li>
             <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
               <span style={{ color: '#805ad5' }}>•</span>
               <span>{t('special_course_notice')}</span>
             </li>
             <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
               <span style={{ color: '#805ad5' }}>•</span>
               <span>{t('no_prepayment')}</span>
             </li>
             <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
               <span style={{ color: '#805ad5' }}>•</span>
               <span>{t('contact_for_questions')}</span>
             </li>
          </ul>
          
          {/* 取消政策声明 */}
          <div style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(128, 90, 213, 0.2)'
          }}>
            <h4 style={{
              color: '#805ad5',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📅</span>
              {t('cancellation_policy_title')}
            </h4>
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
                <span>{t('cancellation_policy_advance')}</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#805ad5' }}>•</span>
                <span>{t('cancellation_policy_late')}</span>
              </li>
            </ul>
          </div>
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