import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

type Booking = {
  date: string
  event: string
  startTime: string
  endTime: string
  maxParticipants: number
  nickName: string
  classType: string
  status: string
  attended: boolean
  cancelled: boolean
  studio: string
  room: string
  price: number
  studioCost: number
  eventID: string
  note: string
  introducer: string
}

type Props = {
  role: "admin" | "user",
  refreshKey?: number
}

const BookingList: React.FC<Props> = ({ role, refreshKey }) => {
  const { t } = useTranslation('common')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userNickname, setUserNickname] = useState<string>('')
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

  useEffect(() => {
    // 获取用户昵称（从localStorage）
    const savedNicknames = localStorage.getItem('bettydance_nicknames');
    if (savedNicknames) {
      const nicknames = JSON.parse(savedNicknames);
      // 使用最后一个保存的昵称作为当前用户昵称
      if (nicknames.length > 0) {
        setUserNickname(nicknames[nicknames.length - 1]);
      }
    }
  }, [refreshKey]); // 添加refreshKey依赖，每次刷新时重新读取userNickname

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookingdata');
        if (response.ok) {
          const data = await response.json();
          
          // 根据角色过滤数据
          if (role === 'user' && userNickname) {
            // 学生只看到自己的预约（不包括已取消的）
            const filteredData = data.filter((booking: any) => 
              booking.nickName === userNickname && !booking.cancelled
            );
            setBookings(filteredData);
          } else if (role === 'admin') {
            // 管理员看到所有预约（包括已取消的），按最新的在上排序
            const sortedData = data.sort((a: any, b: any) => {
              // 按日期排序，最新的在上
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setBookings(sortedData);
          } else if (role === 'user' && !userNickname) {
            // 学生但还没有昵称，显示空列表
            setBookings([]);
          }
        }
      } catch (error) {
        console.error('获取预约数据失败:', error);
      }
    };

    fetchBookings();
  }, [refreshKey, role, userNickname]);

  // 更新签到状态
  const handleCheck = async (idx: number) => {
    try {
      const booking = bookings[idx];
      const response = await fetch('/api/bookingdata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: booking.date,
          event: booking.event,
          startTime: booking.startTime,
          nickName: booking.nickName,
          field: 'attended',
          value: !booking.attended,
        }),
      });
      
      if (response.ok) {
        const updated = bookings.map((b, i) =>
          i === idx ? { ...b, attended: !b.attended } : b
        );
        setBookings(updated);
      }
    } catch (error) {
      console.error('更新签到状态失败:', error);
    }
  };

  // 取消预约
  const handleCancel = async (idx: number) => {
    if (!window.confirm(t('confirm_cancel') || '确定要取消预约吗？')) return;
    
    try {
      const booking = bookings[idx];
      const response = await fetch('/api/bookingdata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: booking.date,
          event: booking.event,
          startTime: booking.startTime,
          nickName: booking.nickName,
          field: 'cancelled',
          value: true,
        }),
      });
      
      if (response.ok) {
        const updated = bookings.filter((_, i) => i !== idx);
        setBookings(updated);
      }
    } catch (error) {
      console.error('取消预约失败:', error);
    }
  };

  // 跳转地图
  const openMap = (location?: string) => {
    if (!location) return
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
    window.open(url, '_blank')
  }

  if (bookings.length === 0) {
    return (
      <div style={{ 
        marginTop: 24,
        textAlign: 'center',
        padding: '40px 20px',
        background: 'rgba(128, 90, 213, 0.05)',
        borderRadius: '8px',
        border: '2px dashed #805ad5',
        color: '#805ad5',
        fontSize: '16px',
        fontWeight: '500'
      }}>
        {role === 'user' 
          ? (t('click_event_to_book') || 'Please click the event on calendar to make your booking')
          : (t('no_booking') || 'No Booking')
        }
      </div>
    );
  }

  return (
    <div>
      <h2 style={{
        color: '#4a5568',
        fontSize: '1.6rem',
        fontWeight: 'bold',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        {role === 'user' 
          ? (t('my_bookings') || '我的预约') 
          : (t('booking_list') || '预约列表')
        }
      </h2>

      {/* 桌面版表格 */}
      {!isMobile && (
        <div>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            background: 'rgba(237, 242, 247, 0.7)', 
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            border: '1px solid #cbd5e0'
          }}>
            <thead>
              <tr style={{ 
                background: 'linear-gradient(135deg, #805ad5, #6b46c1)',
                color: 'white'
              }}>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>{t('nickname') || 'Nickname'}</th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>{t('event') || 'Event'}</th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>{t('date') || 'Date'}</th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>{t('studio') || 'Studio'}</th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>{t('room') || 'Room'}</th>
                {role === 'admin' ? (
                  <>
                    <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>{t('attended') || 'Attended'}</th>
                    <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>{t('cancelled') || 'Cancelled'}</th>
                  </>
                ) : (
                  <>
                    <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>{t('checkin') || 'Check-in'}</th>
                    <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>{t('cancel') || 'Cancel'}</th>
                  </>
                )}
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>{t('introducer')}</th>
                <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>{t('note') || 'Note'}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, idx) => {
                return (
                  <tr key={b.eventID + b.nickName + idx} style={{
                    borderBottom: '1px solid #cbd5e0',
                    transition: 'background-color 0.2s',
                    backgroundColor: b.cancelled ? '#edf2f7' : (idx % 2 === 0 ? 'rgba(247, 250, 252, 0.8)' : 'rgba(237, 242, 247, 0.6)')
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(128, 90, 213, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = b.cancelled ? '#edf2f7' : (idx % 2 === 0 ? 'rgba(247, 250, 252, 0.8)' : 'rgba(237, 242, 247, 0.6)')}
                  >
                    <td style={{ padding: '16px 12px', fontWeight: '500', color: '#2d3748' }}>{b.nickName}</td>
                    <td style={{ padding: '16px 12px', color: '#4a5568' }}>{b.event}</td>
                    <td style={{ padding: '16px 12px', color: '#718096', fontSize: '13px' }}>{b.date}</td>
                    <td style={{ padding: '16px 12px' }}>
                      {b.studio ? (
                        <a href="#" 
                           onClick={e => { e.preventDefault(); openMap(b.studio) }}
                           style={{ 
                             color: '#805ad5', 
                             textDecoration: 'none',
                             fontWeight: '500'
                           }}
                           onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                           onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                          {b.studio}
                        </a>
                      ) : '-'}
                    </td>
                    <td style={{ padding: '16px 12px', color: '#718096' }}>{b.room || '-'}</td>
                    {role === 'admin' ? (
                      <>
                        <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                          <span style={{ 
                            color: b.attended ? '#38a169' : '#a0aec0',
                            fontSize: '18px',
                            fontWeight: 'bold'
                          }}>
                            {b.attended ? '✓' : '-'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                          <span style={{ 
                            color: b.cancelled ? '#e53e3e' : '#a0aec0',
                            fontSize: '18px',
                            fontWeight: 'bold'
                          }}>
                            {b.cancelled ? '✓' : '-'}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={!!b.attended}
                            onChange={() => handleCheck(idx)}
                            style={{
                              width: '18px',
                              height: '18px',
                              cursor: 'pointer',
                              accentColor: '#805ad5'
                            }}
                          />
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                          <button 
                            onClick={() => handleCancel(idx)}
                            style={{
                              background: '#e53e3e',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '8px 16px',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#c53030'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#e53e3e'}
                          >
                            {t('cancel') || 'Cancel'}
                          </button>
                        </td>
                      </>
                    )}
                    <td style={{ 
                      padding: '16px 12px', 
                      fontSize: '13px',
                      color: '#718096',
                      fontWeight: '500'
                    }}>
                      {b.introducer || '-'}
                    </td>
                    <td style={{ 
                      padding: '16px 12px', 
                      whiteSpace: 'pre-line', 
                      maxWidth: '120px',
                      fontSize: '13px',
                      color: '#718096',
                      lineHeight: '1.4'
                    }}>
                      {b.note || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 移动版卡片布局 */}
      {isMobile && (
        <div>
          {bookings.map((b, idx) => (
            <div key={b.eventID + b.nickName + idx} style={{
              background: b.cancelled ? '#edf2f7' : 'rgba(237, 242, 247, 0.7)',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              border: '1px solid #cbd5e0'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '16px',
                    color: '#2d3748',
                    marginBottom: '4px'
                  }}>
                    {b.nickName}
                  </div>
                  <div style={{ 
                    color: '#805ad5',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    {b.event}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {role === 'admin' ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ 
                        color: b.attended ? '#38a169' : '#a0aec0',
                        fontSize: '16px'
                      }}>
                        {b.attended ? '✓' : '○'} 
                      </span>
                      <span style={{ 
                        color: b.cancelled ? '#e53e3e' : '#a0aec0',
                        fontSize: '16px'
                      }}>
                        {b.cancelled ? '✗' : '○'}
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={!!b.attended}
                        onChange={() => handleCheck(idx)}
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer',
                          accentColor: '#805ad5'
                        }}
                      />
                      <button 
                        onClick={() => handleCancel(idx)}
                        style={{
                          background: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {t('cancel') || 'Cancel'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{ 
                fontSize: '13px',
                color: '#718096',
                lineHeight: '1.4',
                marginBottom: '8px'
              }}>
                📅 {b.date}
              </div>
              
              <div style={{ 
                display: 'flex',
                gap: '16px',
                fontSize: '13px',
                color: '#718096',
                marginBottom: '8px'
              }}>
                <div>
                  📍 {b.studio ? (
                    <a href="#" 
                       onClick={e => { e.preventDefault(); openMap(b.studio) }}
                       style={{ color: '#805ad5', textDecoration: 'none' }}
                    >
                      {b.studio}
                    </a>
                  ) : '-'}
                </div>
                <div>🏠 {b.room || '-'}</div>
                {b.introducer && (
                  <div>👥 {b.introducer}</div>
                )}
              </div>
              
              {b.note && (
                <div style={{ 
                  fontSize: '13px',
                  color: '#718096',
                  backgroundColor: 'rgba(226, 232, 240, 0.6)',
                  padding: '8px',
                  borderRadius: '4px',
                  whiteSpace: 'pre-line',
                  lineHeight: '1.4'
                }}>
                  {b.note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// 简单提取房间号（假设 Note 里有 "房间: XXX" 或 "Room: XXX"）
function extractRoom(note: string): string {
  const match = note.match(/(?:房间|Room)[:：]?\s*([A-Za-z0-9\-]+)/i)
  return match ? match[1] : '-'
}

export default BookingList 