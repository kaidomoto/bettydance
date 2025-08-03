import React, { useState, useEffect } from "react";
import PasswordGate from "../components/PasswordGate";
import BookingCalendar from '../components/BookingCalendar'
import BookingModal from '../components/BookingModal'
import BookingList from '../components/BookingList'
import WelcomeMessage from '../components/WelcomeMessage'
import { useTranslation } from 'next-i18next'
import NavBar from '../components/NavBar'
import { EventAddArg, EventChangeArg, EventRemoveArg } from '@fullcalendar/core'

export default function Home() {
  const [role, setRole] = useState<"admin" | "user" | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const { t } = useTranslation('common')
  const [refreshKey, setRefreshKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  if (!role) {
    return <PasswordGate onAuth={setRole} />
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const handleBookingSubmit = (nickname: string) => {
    // 保存预约信息到 localStorage
    const bookings = JSON.parse(localStorage.getItem('bettydance_bookings') || '[]')
    bookings.push({
      nickname,
      eventTitle: selectedEvent.title,
      date: selectedEvent.start?.toLocaleString(),
      location: selectedEvent.extendedProps?.location,
      note: selectedEvent.extendedProps?.description,
      id: selectedEvent.id,
    })
    localStorage.setItem('bettydance_bookings', JSON.stringify(bookings))
    setModalOpen(false)
    
    // 立即刷新预约列表
    setRefreshKey(k => k + 1);
    
    // 再次确保刷新（解决可能的延迟问题）
    setTimeout(() => {
      setRefreshKey(k => k + 1);
    }, 500);
  }

  return (
    <div style={{ 
      background: 'url(/rabbit-bg.jpg) center/cover, linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      backgroundBlendMode: 'overlay',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* 全局CSS覆盖 */}
      <style jsx global>{`
        /* 彻底清除黄色和橙色样式 */
        body {
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%) !important;
          color: #2d3748 !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: #4a5568 !important;
        }
        
        a {
          color: #805ad5 !important;
        }
        
        button {
          background: #805ad5 !important;
          color: white !important;
        }
        
        button:hover {
          background: #6b46c1 !important;
        }
        
        th {
          background: rgba(237, 242, 247, 0.8) !important;
          color: #4a5568 !important;
        }
        
        /* 强制覆盖所有FullCalendar的黄色样式 */
        .fc .fc-daygrid-day {
          background-color: transparent !important;
        }
        .fc .fc-daygrid-day-number {
          color: #4a5568 !important;
        }
        .fc .fc-col-header-cell {
          background-color: rgba(237, 242, 247, 0.8) !important;
          color: #4a5568 !important;
        }
        .fc .fc-col-header-cell-cushion {
          color: #4a5568 !important;
        }
        .fc .fc-day-today {
          background-color: rgba(128, 90, 213, 0.08) !important;
        }
        .fc .fc-day-today .fc-daygrid-day-number {
          color: #805ad5 !important;
          font-weight: 700 !important;
        }
        .fc .fc-toolbar-title {
          color: #4a5568 !important;
        }
        .fc .fc-button {
          background-color: rgba(113, 128, 150, 0.1) !important;
          border-color: rgba(113, 128, 150, 0.3) !important;
          color: #4a5568 !important;
        }
        .fc .fc-button:hover {
          background-color: rgba(128, 90, 213, 0.15) !important;
          border-color: #805ad5 !important;
          color: #805ad5 !important;
        }
        .fc .fc-event {
          background-color: #805ad5 !important;
          border-color: #805ad5 !important;
          color: white !important;
        }
        
        /* 清除所有可能的黄色背景 */
        .fc * {
          background-color: transparent !important;
        }
        .fc .fc-scrollgrid {
          background-color: rgba(255, 255, 255, 0.6) !important;
        }
        .fc .fc-col-header-cell {
          background-color: rgba(237, 242, 247, 0.8) !important;
        }
        .fc .fc-day-today {
          background-color: rgba(128, 90, 213, 0.08) !important;
        }
        
        /* 强制覆盖月份标题颜色 */
        .fc .fc-toolbar-title {
          color: #4a5568 !important;
        }
        
        /* 覆盖所有日期数字颜色 */
        .fc .fc-daygrid-day-number,
        .fc .fc-col-header-cell,
        .fc .fc-col-header-cell-cushion,
        .fc .fc-daygrid-day-top {
          color: #4a5568 !important;
        }
        
        /* 今天的特殊样式 */
        .fc .fc-day-today .fc-daygrid-day-number,
        .fc .fc-day-today .fc-col-header-cell-cushion {
          color: #805ad5 !important;
          font-weight: 700 !important;
        }
        
        /* 彻底清除任何黄色或橙色 */
        .fc [style*="yellow"],
        .fc [style*="orange"],
        .fc [style*="#ff"],
        .fc [style*="#f9"],
        .fc [style*="#fa"],
        .fc [style*="#fb"],
        .fc [style*="#fc"],
        .fc [style*="#fd"],
        .fc [style*="#fe"],
        .fc [style*="rgb(255"],
        .fc [style*="rgb(254"],
        .fc [style*="rgb(253"],
        .fc [style*="rgb(252"],
        .fc [style*="rgb(251"],
        .fc [style*="rgb(250"],
        .fc [style*="rgb(249"] {
          background-color: transparent !important;
          color: #4a5568 !important;
        }
        
        /* 强制覆盖所有可能包含黄色的元素 */
        *[style*="yellow"],
        *[style*="orange"],
        *[style*="#e67e22"],
        *[style*="#f39c12"],
        *[style*="#f1c40f"],
        *[style*="#ffeb3b"],
        *[style*="#ffc107"],
        *[style*="#ff9800"],
        *[style*="rgb(230, 126, 34)"],
        *[style*="rgb(243, 156, 18)"],
        *[style*="rgb(241, 196, 15)"] {
          background-color: transparent !important;
          color: #4a5568 !important;
        }
      `}</style>
      
      <NavBar />
      
      {/* 欢迎信息 */}
      <WelcomeMessage role={role} />
      
      {/* 主容器 */}
      <div style={{ 
        maxWidth: 1000, 
        margin: '0 auto', 
        padding: isMobile ? '10px 20px' : '20px 20px',
        color: '#2d3748'
      }}>
        
        {/* 日历区域 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: isMobile ? '15px 15px 20px 15px' : '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(10px)',
          marginBottom: isMobile ? '20px' : '40px'
        }}>
          <h1 style={{
            color: '#2d3748',
            fontSize: isMobile ? '1.3rem' : '1.8rem',
            fontWeight: '600',
            marginBottom: isMobile ? '8px' : '24px',
            textAlign: 'center'
          }}>
            {t('schedule')}
          </h1>
          
          <div style={{
            background: isMobile ? 'transparent' : 'rgba(237, 242, 247, 0.7)',
            borderRadius: isMobile ? '0px' : '5px',
            padding: isMobile ? '0px' : '5px',
            boxShadow: isMobile ? 'none' : '0 2px 5px rgba(0, 0, 0, 0.04)',
            border: isMobile ? 'none' : '1px solid #cbd5e0'
          }}>
            <BookingCalendar onEventClick={handleEventClick} role={role} />
          </div>
        </div>

        {/* 预约列表区域 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(10px)'
        }}>
          <BookingList role={role} refreshKey={refreshKey} />
        </div>
      </div>

      <BookingModal
        open={modalOpen}
        event={selectedEvent}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBookingSubmit}
      />
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  const { serverSideTranslations } = require('next-i18next/serverSideTranslations')
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}