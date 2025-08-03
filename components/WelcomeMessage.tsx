import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

interface Props {
  role: "admin" | "user";
}

interface NextClass {
  datetime: string;
  studio: string;
  room: string;
  bookings: number;
}

const WelcomeMessage: React.FC<Props> = ({ role }) => {
  const { t } = useTranslation('common');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextClass, setNextClass] = useState<NextClass | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 每分钟更新一次

    return () => clearInterval(timer);
  }, []);

  // 获取下节课信息（仅对Admin）
  useEffect(() => {
    if (role === 'admin') {
      fetchNextClass();
    }
  }, [role]);

  const fetchNextClass = async () => {
    try {
      // 1. 获取Google Sheets中的所有预约数据
      const bookingResponse = await fetch('/api/bookingdata');
      
      if (!bookingResponse.ok) {
        throw new Error('Failed to fetch booking data');
      }
      
      const bookingData = await bookingResponse.json();
      console.log('All booking data:', bookingData);
      
      if (bookingData.length === 0) {
        setNextClass(null);
        return;
      }
      
      // 2. 找到所有未来的日期，并按日期排序
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 只比较日期，不比较时间
      
      const futureBookings = bookingData.filter((booking: any) => {
        const bookingDate = new Date(booking.date);
        const bookingDateOnly = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate());
        const isNotCancelled = booking.cancelled !== true && booking.cancelled !== 'TRUE';
        return bookingDateOnly >= today && isNotCancelled;
      });
      
      console.log('Future bookings:', futureBookings);
      
      if (futureBookings.length === 0) {
        setNextClass(null);
        return;
      }
      
      // 3. 按日期排序，找到最近的日期
      futureBookings.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
      
      const nextBooking = futureBookings[0];
      const nextDate = nextBooking.date;
      
      console.log('Next class date:', nextDate);
      
      // 4. 计算该日期在Google Sheets中出现的次数（未取消的）
      const matchingBookings = bookingData.filter((booking: any) => {
        const isDateMatch = booking.date === nextDate;
        const isNotCancelled = booking.cancelled !== true && booking.cancelled !== 'TRUE';
        
        console.log(`Checking booking ${booking.nickName}:`, 
          'bookingDate=', booking.date,
          'nextDate=', nextDate,
          'isDateMatch=', isDateMatch,
          'cancelled=', booking.cancelled,
          'isNotCancelled=', isNotCancelled
        );
        
        return isDateMatch && isNotCancelled;
      });
      
      const bookingCount = matchingBookings.length;
      
      console.log(`Matching bookings for ${nextDate}:`, matchingBookings);
      console.log(`Final count for ${nextDate}:`, bookingCount);
      
      // 5. 构造下一节课信息
      setNextClass({
        datetime: `${nextBooking.date} ${nextBooking.startTime}`,
        studio: nextBooking.studio || 'TBD',
        room: nextBooking.room || 'TBD',
        bookings: bookingCount
      });
      
    } catch (error) {
      console.error('Failed to fetch next class:', error);
      setNextClass(null);
    }
  };

  // 获取时间问候语
  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      return t('good_morning');
    } else if (hour < 18) {
      return t('good_afternoon'); 
    } else {
      return t('good_evening');
    }
  };

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (role === 'user') {
    return (
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '8px 16px' : '16px',
        marginBottom: isMobile ? '8px' : '10px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(128, 90, 213, 0.1) 0%, rgba(128, 90, 213, 0.05) 100%)',
          borderRadius: '12px',
          padding: isMobile ? '12px 16px' : '20px 24px',
          border: '1px solid rgba(128, 90, 213, 0.2)',
          boxShadow: '0 4px 12px rgba(128, 90, 213, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: isMobile ? '1.1rem' : '1.2rem',
            fontWeight: '600',
            color: '#805ad5',
            marginBottom: '8px'
          }}>
            {getTimeGreeting()}! 👋
          </div>
          <div style={{
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: '#4a5568'
          }}>
            {t('welcome_user_message')}
          </div>
        </div>
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '8px 16px' : '16px',
        marginBottom: isMobile ? '8px' : '10px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(72, 187, 120, 0.05) 100%)',
          borderRadius: '12px',
          padding: isMobile ? '12px 16px' : '20px 24px',
          border: '1px solid rgba(72, 187, 120, 0.2)',
          boxShadow: '0 4px 12px rgba(72, 187, 120, 0.1)'
        }}>
          <div style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '600',
            color: '#48bb78',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <span>📊</span>
            {t('next_class_info')}
          </div>
          
          {nextClass ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              color: '#4a5568',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <div>
                <strong>{t('class_time')}:</strong><br />
                {formatDateTime(nextClass.datetime)}
              </div>
              <div>
                <strong>{t('class_location')}:</strong><br />
                {nextClass.studio} - {nextClass.room}
              </div>
              <div>
                <strong>{t('total_bookings')}:</strong><br />
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  color: '#805ad5' 
                }}>
                  {nextClass.bookings}
                </span> people
              </div>
            </div>
          ) : (
            <div style={{
              color: '#718096',
              fontStyle: 'italic'
            }}>
              {t('no_upcoming_classes')}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default WelcomeMessage;