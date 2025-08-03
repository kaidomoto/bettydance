import React, { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'

type Props = {
  open: boolean
  event: any
  onClose: () => void
  onSubmit: (nickname: string) => void
}

const BookingModal: React.FC<Props> = ({ open, event, onClose, onSubmit }) => {
  const { t } = useTranslation('common')
  const [nickname, setNickname] = useState('')
  const [savedNicknames, setSavedNicknames] = useState<string[]>([])
  const [introducer, setIntroducer] = useState('')
  const [existingMembers, setExistingMembers] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // 检测屏幕尺寸
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // 不再需要获取学员列表，改为输入框

  useEffect(() => {
    const saved = localStorage.getItem('bettydance_nicknames')
    if (saved) {
      const nicknames = JSON.parse(saved)
      setSavedNicknames(nicknames)
      // 如果有保存的昵称，自动填入最后一个
      if (nicknames.length > 0) {
        setNickname(nicknames[nicknames.length - 1])
      }
    }
  }, [open])

  // 确保 nickname 不为空
  useEffect(() => {
    if (savedNicknames.length > 0 && !nickname) {
      setNickname(savedNicknames[savedNicknames.length - 1])
    }
  }, [savedNicknames, nickname])

  const handleSave = async () => {
    if (!nickname || nickname.trim() === '') {
      alert('Please enter a nickname');
      return;
    }
    
    setIsSubmitting(true);
    
    let updated = Array.from(new Set([nickname, ...savedNicknames]))
    localStorage.setItem('bettydance_nicknames', JSON.stringify(updated))
    
    // 提交到 Google Sheets via API
    try {
      // 提取房间号和备注信息
      const description = event.extendedProps?.description || '';
      const noteLines = description.split('\n');
      const room = noteLines[0] || '';
      const note = noteLines.slice(1).join('\n') || '';
      
      const response = await fetch('/api/bookingdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: event.title,
          date: event.start?.toLocaleDateString('en-US'),
          startTime: event.start?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          endTime: event.end?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          nickName: nickname,
          studio: event.extendedProps?.location || '',
          room: room,
          note: note,
          introducer: introducer, // 添加推荐人字段
        }),
      });
      
      if (response.ok) {
        onSubmit(nickname);
      } else {
        alert('报名失败，请重试');
      }
    } catch (error) {
      console.error('报名错误:', error);
      alert('报名失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open || !event) return null

  return (
    <div style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
      background: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{ 
        background: 'rgba(247, 250, 252, 0.9)', 
        padding: isMobile ? '24px' : '32px', 
        borderRadius: '12px', 
        minWidth: isMobile ? '100%' : '480px',
        maxWidth: isMobile ? '100%' : '500px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        border: '1px solid #cbd5e0',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backdropFilter: 'blur(10px)'
      }}>
        {/* 关闭按钮 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '16px' 
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#718096',
              padding: '0',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f7fafc'
              e.currentTarget.style.color = '#4a5568'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#718096'
            }}
          >
            ✕
          </button>
        </div>

        {/* 标题和时间 */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h3 style={{
            color: '#4a5568',
            fontSize: isMobile ? '1.3rem' : '1.5rem',
            fontWeight: 'bold',
            margin: '0 0 12px 0',
            lineHeight: '1.3'
          }}>
            {event.title}
          </h3>
          <div style={{
            background: 'rgba(128, 90, 213, 0.08)',
            borderRadius: '8px',
            padding: '16px',
            margin: '0 0 8px 0',
            border: '1px solid rgba(128, 90, 213, 0.25)'
          }}>
            <div style={{
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              📅 {event.start?.toLocaleDateString()}
            </div>
            <div style={{
              color: '#718096',
              fontSize: '13px',
              fontWeight: '500'
            }}>
              ⏰ {event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {event.end && ` - ${event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </div>
            {event.extendedProps?.location && (
              <div style={{
                color: '#718096',
                fontSize: '13px',
                fontWeight: '500',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}>
                📍 {event.extendedProps.location}
              </div>
            )}
          </div>
        </div>

        {/* 昵称输入 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#4a5568',
            fontSize: '14px'
          }}>
            {t('nickname') || 'Nickname'}：
          </label>
          {savedNicknames.length > 0 ? (
            // 如果有保存的昵称，显示为只读
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                padding: '12px 16px', 
                border: '2px solid #805ad5', 
                borderRadius: '8px', 
                background: 'rgba(128, 90, 213, 0.05)',
                color: '#805ad5',
                fontWeight: '600',
                flex: 1
              }}>
                {nickname}
              </div>
              <span style={{ 
                fontSize: '12px', 
                color: '#718096',
                background: 'rgba(237, 242, 247, 0.8)',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                ({t('english_only') || 'English'})
              </span>
            </div>
          ) : (
            // 如果没有保存的昵称，显示输入框
            <div>
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder={t('nickname') || 'Nickname'}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.7)',
                  boxSizing: 'border-box',
                  marginBottom: '8px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#805ad5'
                  e.target.style.boxShadow = '0 0 0 3px rgba(128, 90, 213, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e0'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <div style={{ 
                fontSize: '12px', 
                color: '#718096',
                textAlign: 'center'
              }}>
                ({t('english_only') || 'English'})
              </div>
            </div>
          )}
        </div>

        {/* 推荐人选择 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'flex',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#4a5568',
            fontSize: '14px',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>👥</span>
            {t('introducer_optional')}：
          </label>
          <input
            type="text"
            value={introducer}
            onChange={e => setIntroducer(e.target.value)}
            placeholder={t('introducer_optional') || 'Introducer (Optional)'}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              outline: 'none',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.7)',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#805ad5'
              e.target.style.boxShadow = '0 0 0 3px rgba(128, 90, 213, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#cbd5e0'
              e.target.style.boxShadow = 'none'
            }}
          />
          <div style={{ 
            fontSize: '12px', 
            color: '#718096',
            marginTop: '4px',
            fontStyle: 'italic'
          }}>
            {t('introducer_benefit')}
          </div>
        </div>

        {/* 备注信息 */}
        {event.extendedProps?.description && (
          <div style={{ 
            marginBottom: '24px',
            background: 'rgba(128, 90, 213, 0.08)', 
            padding: '16px', 
            borderRadius: '8px', 
            border: '1px solid rgba(128, 90, 213, 0.25)'
          }}>
            <div style={{
              fontWeight: '600',
              color: '#4a5568',
              marginBottom: '8px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              📝 {t('note') || '备注/注意事项'}
            </div>
            <div style={{ 
              whiteSpace: 'pre-line',
              color: '#718096',
              fontSize: '13px',
              lineHeight: '1.5'
            }}>
              {event.extendedProps.description}
            </div>
          </div>
        )}

        {/* 按钮组 */}
        <div style={{ 
          display: 'flex', 
          gap: '12px',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <button 
            onClick={handleSave} 
            disabled={isSubmitting || !nickname.trim()}
            style={{
              flex: 1,
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '600',
              background: isSubmitting || !nickname.trim() 
                ? '#a0aec0' 
                : '#805ad5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isSubmitting || !nickname.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && nickname.trim()) {
                e.currentTarget.style.background = '#6b46c1'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting && nickname.trim()) {
                e.currentTarget.style.background = '#805ad5'
              }
            }}
          >
            {isSubmitting ? (
              <>
                <span style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></span>
                Loading...
              </>
            ) : (
              <>
                ✅ {t('enter') || '提交'}
              </>
            )}
          </button>
          <button 
            onClick={onClose}
            style={{
              flex: isMobile ? 1 : 'none',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '600',
              background: 'rgba(237, 242, 247, 0.8)',
              color: '#718096',
              border: '2px solid #cbd5e0',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(226, 232, 240, 0.9)'
              e.currentTarget.style.borderColor = '#a0aec0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(237, 242, 247, 0.8)'
              e.currentTarget.style.borderColor = '#cbd5e0'
            }}
          >
            {t('cancel') || '取消'}
          </button>
        </div>
      </div>

      {/* 添加旋转动画的CSS */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default BookingModal 