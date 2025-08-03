import React, { useRef, useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import { useTranslation } from 'next-i18next'

const GOOGLE_CALENDAR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY as string;
const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID as string;

type Props = {
  onEventClick: (event: any) => void
  role: "admin" | "user"
}

const BookingCalendar: React.FC<Props> = ({ onEventClick, role }) => {
  const { t } = useTranslation('common')
  const calendarRef = useRef(null)
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

  // 强制清除黄色样式
  useEffect(() => {
    const forceRemoveYellow = () => {
      // 等待DOM渲染完成
      setTimeout(() => {
        const elements = document.querySelectorAll('.fc *')
        elements.forEach(el => {
          const style = window.getComputedStyle(el)
          if (style.backgroundColor.indexOf('255, 193') !== -1 || 
              style.backgroundColor.indexOf('255, 235') !== -1 ||
              style.backgroundColor.indexOf('255, 243') !== -1 ||
              style.color.indexOf('255, 193') !== -1 ||
              style.color.indexOf('orange') !== -1 ||
              style.color.indexOf('yellow') !== -1) {
            const element = el as HTMLElement
            element.style.backgroundColor = 'transparent'
            element.style.color = '#4a5568'
          }
        })
      }, 100)
    }

    forceRemoveYellow()
    // 定期检查并清除
    const interval = setInterval(forceRemoveYellow, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      '& .fc': {
        fontSize: isMobile ? '12px' : '14px',
        backgroundColor: 'transparent'
      },
             '& .fc-toolbar': {
         marginBottom: isMobile ? '1rem' : '1.5rem',
         flexDirection: isMobile ? 'column' : 'row',
         gap: isMobile ? '20px' : '0',
         backgroundColor: 'transparent',
         padding: isMobile ? '12px 16px' : '0'
       },
      '& .fc-toolbar-chunk': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
             '& .fc-toolbar-title': {
         fontSize: isMobile ? '0.95rem' : '1.2rem',
         fontWeight: '700',
         color: '#4a5568 !important',
         textAlign: 'center',
         margin: isMobile ? '0 30px' : '0',
         padding: isMobile ? '8px 0px' : '8px 16px'
       },
      '& .fc-button': {
        backgroundColor: 'rgba(113, 128, 150, 0.1) !important',
        borderColor: 'rgba(113, 128, 150, 0.3) !important',
        color: '#4a5568 !important',
        fontSize: isMobile ? '10px' : '13px',
        fontWeight: '500',
        borderRadius: isMobile ? '12px' : '20px',
        padding: isMobile ? '4px 8px' : '8px 16px',
        minHeight: 'auto',
        height: 'auto',
        boxShadow: 'none',
        border: '1px solid rgba(113, 128, 150, 0.3)',
        margin: isMobile ? '0 3px' : '0 4px',
        transition: 'all 0.2s ease'
      },
      '& .fc-button:hover': {
        backgroundColor: 'rgba(128, 90, 213, 0.15) !important',
        borderColor: '#805ad5 !important',
        color: '#805ad5 !important',
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(128, 90, 213, 0.2)'
      },
      '& .fc-button:focus': {
        backgroundColor: 'rgba(128, 90, 213, 0.15) !important',
        borderColor: '#805ad5 !important',
        color: '#805ad5 !important',
        boxShadow: '0 0 0 2px rgba(128, 90, 213, 0.2)',
        outline: 'none'
      },
      '& .fc-button:active': {
        backgroundColor: 'rgba(128, 90, 213, 0.2) !important',
        borderColor: '#805ad5 !important',
        color: '#805ad5 !important',
        transform: 'translateY(0)'
      },
      '& .fc-button-active': {
        backgroundColor: '#805ad5 !important',
        borderColor: '#805ad5 !important',
        color: 'white !important',
        boxShadow: '0 2px 8px rgba(128, 90, 213, 0.3)'
      },
      '& .fc-button-primary': {
        backgroundColor: 'rgba(113, 128, 150, 0.1) !important',
        borderColor: 'rgba(113, 128, 150, 0.3) !important',
        color: '#4a5568 !important'
      },
             '& .fc-prev-button, & .fc-next-button': {
         minWidth: isMobile ? '24px' : '36px',
         padding: isMobile ? '4px' : '8px',
         fontSize: isMobile ? '10px' : '13px'
       },
      '& .fc-today-button': {
        fontWeight: '600',
        letterSpacing: '0.5px'
      },
                          '& .fc-event': {
        backgroundColor: '#805ad5 !important',
        borderColor: '#805ad5 !important',
        fontSize: isMobile ? '7px' : '9px',
        cursor: 'pointer',
        padding: '2px 4px',
        borderRadius: '4px',
        border: 'none !important',
        fontWeight: '400 !important'
      },
      '& .fc-event:hover': {
        backgroundColor: '#6b46c1 !important',
        borderColor: '#6b46c1 !important',
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(107, 70, 193, 0.3)'
      },
                          '& .fc-daygrid-day': {
        minHeight: isMobile ? '28px' : '40px',
        backgroundColor: 'transparent !important'
      },
      '& .fc-col-header-cell': {
        fontSize: isMobile ? '12px' : '12px',
        fontWeight: '600',
        color: '#4a5568 !important',
        backgroundColor: 'rgba(237, 242, 247, 0.8) !important',
        padding: isMobile ? '10px 2px' : '8px 4px'
      },
      '& .fc-col-header-cell-cushion': {
        color: '#4a5568 !important',
        textDecoration: 'none'
      },
      '& .fc-daygrid-day-number': {
        fontSize: isMobile ? '13px' : '12px',
        color: '#4a5568 !important',
        fontWeight: '500',
        padding: isMobile ? '6px' : '4px'
      },
      '& .fc-daygrid-day-top': {
        color: '#4a5568 !important'
      },
      '& .fc-day-today': {
        backgroundColor: 'rgba(128, 90, 213, 0.08) !important'
      },
      '& .fc-day-today .fc-daygrid-day-number': {
        color: '#805ad5 !important',
        fontWeight: '700'
      },
      '& .fc-day-today .fc-col-header-cell-cushion': {
        color: '#805ad5 !important'
      },
      '& .fc-scrollgrid': {
        border: '1px solid #cbd5e0',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.6) !important'
      },
      '& .fc-scrollgrid-section > td': {
        borderColor: '#e2e8f0 !important'
      },
      '& .fc-scrollgrid tbody tr:first-child td': {
        borderTop: 'none'
      },
      '& .fc-daygrid-day-frame': {
        backgroundColor: 'transparent !important'
      },
      '& .fc-daygrid-day-bg': {
        backgroundColor: 'transparent !important'
      },
      '& .fc-highlight': {
        backgroundColor: 'rgba(128, 90, 213, 0.1) !important'
      },
      // 强制覆盖所有可能的黄色样式
      '& .fc-day-past': {
        backgroundColor: 'transparent !important',
        color: '#a0aec0 !important'
      },
      '& .fc-day-future': {
        backgroundColor: 'transparent !important',
        color: '#4a5568 !important'
      },
      '& .fc-day-other': {
        backgroundColor: 'transparent !important',
        color: '#a0aec0 !important'
      },
      '& .fc-day-disabled': {
        backgroundColor: 'transparent !important',
        color: '#e2e8f0 !important'
      },
      // 覆盖所有单元格背景
      '& .fc-daygrid-day, & .fc-daygrid-day-frame, & .fc-daygrid-day-bg, & .fc-day': {
        backgroundColor: 'transparent !important'
      },
      // 覆盖所有文字颜色
      '& .fc-daygrid-day-number, & .fc-col-header-cell, & .fc-col-header-cell-cushion, & .fc-day-top': {
        color: '#4a5568 !important'
      },
      // 特别处理今天的样式
      '& .fc-day-today, & .fc-day-today .fc-daygrid-day-frame, & .fc-day-today .fc-daygrid-day-bg': {
        backgroundColor: 'rgba(128, 90, 213, 0.08) !important'
      },
      '& .fc-day-today .fc-daygrid-day-number, & .fc-day-today .fc-col-header-cell-cushion': {
        color: '#805ad5 !important',
        fontWeight: '700'
      },
      // 清除所有可能的黄色和橙色
      '& *': {
        '&[style*="yellow"], &[style*="orange"], &[style*="#f"], &[style*="rgb(255"]': {
          backgroundColor: 'transparent !important',
          color: '#4a5568 !important'
        }
      }
    } as React.CSSProperties}>
              <style>
          {`
            /* 强制覆盖FullCalendar按钮样式 */
            .fc .fc-button {
              background-color: rgba(113, 128, 150, 0.1) !important;
              border-color: rgba(113, 128, 150, 0.3) !important;
              color: #4a5568 !important;
              font-size: ${isMobile ? '10px' : '13px'} !important;
              font-weight: 500 !important;
              border-radius: ${isMobile ? '12px' : '20px'} !important;
              padding: ${isMobile ? '4px 8px' : '8px 16px'} !important;
              min-height: auto !important;
              height: auto !important;
              box-shadow: none !important;
              border: 1px solid rgba(113, 128, 150, 0.3) !important;
              margin: ${isMobile ? '0 3px' : '0 4px'} !important;
              transition: all 0.2s ease !important;
            }
            
            .fc .fc-prev-button, .fc .fc-next-button {
              min-width: ${isMobile ? '24px' : '36px'} !important;
              padding: ${isMobile ? '4px' : '8px'} !important;
              font-size: ${isMobile ? '10px' : '13px'} !important;
              width: ${isMobile ? '24px' : 'auto'} !important;
            }
            
            .fc .fc-today-button {
              font-size: ${isMobile ? '10px' : '13px'} !important;
              padding: ${isMobile ? '4px 8px' : '8px 16px'} !important;
            }
            
            .fc .fc-toolbar-title {
              font-size: ${isMobile ? '0.95rem' : '1.2rem'} !important;
              font-weight: 700 !important;
              color: #4a5568 !important;
              text-align: center !important;
              margin: 0 !important;
              padding: ${isMobile ? '4px 8px' : '8px 16px'} !important;
            }
            
            .fc .fc-toolbar {
              margin-bottom: ${isMobile ? '0.5rem' : '0.5rem'} !important;
              flex-direction: row !important;
              gap: 0 !important;
              background-color: transparent !important;
              padding: ${isMobile ? '8px 16px' : '0'} !important;
              justify-content: space-between !important;
            }
            
            /* 减少日历头部和表格间距 */
            .fc .fc-daygrid-header {
              margin-bottom: -5px !important;
            }
            
            /* 控制整个日历表格的宽度和溢出 */
            .fc .fc-scrollgrid {
              width: 100% !important;
              table-layout: fixed !important;
              margin-top: -5px !important;
            }
            
            /* 控制表格列宽 */
            .fc .fc-scrollgrid-section > * > tr > .fc-daygrid-day {
              width: ${isMobile ? 'auto' : '14.28%'} !important;
              max-width: ${isMobile ? 'auto' : '14.28%'} !important;
              min-width: ${isMobile ? 'auto' : '100px'} !important;
            }
            
            .fc .fc-scrollgrid-section > * > tr > .fc-col-header-cell {
              width: ${isMobile ? 'auto' : '14.28%'} !important;
              max-width: ${isMobile ? 'auto' : '14.28%'} !important;
              min-width: ${isMobile ? 'auto' : '100px'} !important;
            }
            
            /* 防止日历内容溢出 */
            .fc .fc-daygrid-body {
              overflow: hidden !important;
            }
            
            /* 全局覆盖所有FullCalendar的黄色 */
            .fc .fc-daygrid-day {
              background-color: transparent !important;
              overflow: hidden !important;
            }
            .fc .fc-daygrid-day-number {
              color: #4a5568 !important;
            }
            .fc .fc-col-header-cell {
              background-color: rgba(237, 242, 247, 0.8) !important;
              color: #4a5568 !important;
              overflow: hidden !important;
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
            .fc .fc-button:hover {
              background-color: rgba(128, 90, 213, 0.15) !important;
              border-color: #805ad5 !important;
              color: #805ad5 !important;
            }
            .fc .fc-event {
              background-color: #805ad5 !important;
              border-color: #805ad5 !important;
              font-size: ${isMobile ? '7px' : '9px'} !important;
              font-weight: 400 !important;
            }
            .fc .fc-event-title {
              font-size: ${isMobile ? '7px' : '9px'} !important;
              font-weight: 400 !important;
            }
            .fc .fc-event-time {
              font-size: ${isMobile ? '7px' : '9px'} !important;
              font-weight: 400 !important;
            }
            /* 清除所有黄色和橙色 */
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
          `}
        </style>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        events={{
          googleCalendarApiKey: GOOGLE_CALENDAR_API_KEY,
          googleCalendarId: CALENDAR_ID,
        }}
        eventClick={info => {
          if (role === 'admin') {
            // 管理员：跳转到 Google Calendar 事件页面
            // 不要 preventDefault
            window.open(info.event.url, '_blank');
          } else {
            // 学员：弹出报名表单
            info.jsEvent.preventDefault();
            onEventClick(info.event);
          }
        }}
        editable={role === 'admin'}
        selectable={role === 'admin'}
        height={isMobile ? "480px" : "500px"}
        aspectRatio={isMobile ? 1.2 : 1.2}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today'
        }}
        dayMaxEventRows={isMobile ? 1 : 2}
        moreLinkText="more"
        eventDisplay="block"
        dayHeaderFormat={{ weekday: 'short' }}
        firstDay={1} // 周一作为第一天
        locale="en" // 可以根据用户语言动态设置
        fixedWeekCount={false}
        showNonCurrentDates={false}
      />
    </div>
  )
}

export default BookingCalendar 