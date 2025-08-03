import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'

const NavBar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // 检测屏幕尺寸
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // 检查是否已登录
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('bettydance_role');

  const handleLogout = () => {
    localStorage.removeItem('bettydance_role');
    window.location.reload(); // 或 router.replace('/') 跳转到首页
  };

  const linkStyle = (isActive: boolean) => ({
    color: isActive ? '#805ad5' : '#4a5568',
    fontWeight: isActive ? '700' : '500',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    background: isActive ? 'rgba(128, 90, 213, 0.1)' : 'transparent'
  })

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '16px 20px' : '20px 32px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)'
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <span style={{
          fontWeight: '700',
          fontSize: isMobile ? '18px' : '24px',
          color: '#2d3748',
          letterSpacing: '0.5px',
          fontFamily: "'Segoe UI', system-ui, sans-serif"
        }}>
          Betty Dance
        </span>
      </div>

      {/* 桌面版导航 */}
      {!isMobile && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Link href="/" legacyBehavior>
            <a style={linkStyle(router.pathname === '/')}
               onMouseEnter={(e) => {
                 if (router.pathname !== '/') {
                   e.currentTarget.style.background = 'rgba(128, 90, 213, 0.05)'
                   e.currentTarget.style.color = '#805ad5'
                 }
               }}
               onMouseLeave={(e) => {
                 if (router.pathname !== '/') {
                   e.currentTarget.style.background = 'transparent'
                   e.currentTarget.style.color = '#4a5568'
                 }
               }}
            >
              {t('booking_list')}
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a style={linkStyle(router.pathname === '/about')}
               onMouseEnter={(e) => {
                 if (router.pathname !== '/about') {
                   e.currentTarget.style.background = 'rgba(128, 90, 213, 0.05)'
                   e.currentTarget.style.color = '#805ad5'
                 }
               }}
               onMouseLeave={(e) => {
                 if (router.pathname !== '/about') {
                   e.currentTarget.style.background = 'transparent'
                   e.currentTarget.style.color = '#4a5568'
                 }
               }}
            >
              {t('about') || '关于'}
            </a>
          </Link>
          <Link href="/price" legacyBehavior>
            <a style={linkStyle(router.pathname === '/price')}
               onMouseEnter={(e) => {
                 if (router.pathname !== '/price') {
                   e.currentTarget.style.background = 'rgba(128, 90, 213, 0.05)'
                   e.currentTarget.style.color = '#805ad5'
                 }
               }}
               onMouseLeave={(e) => {
                 if (router.pathname !== '/price') {
                   e.currentTarget.style.background = 'transparent'
                   e.currentTarget.style.color = '#4a5568'
                 }
               }}
            >
              {t('price') || '价格'}
            </a>
          </Link>
          
          {isLoggedIn && (
            <button
              style={{
                marginLeft: '16px',
                background: '#805ad5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 20px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6b46c1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#805ad5'
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* 移动版菜单按钮 */}
      {isMobile && (
        <div>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#4a5568'
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
          
          {/* 移动版下拉菜单 */}
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              padding: '16px',
              minWidth: '180px',
              zIndex: 1000,
              backdropFilter: 'blur(10px)'
            }}>
              <Link href="/" legacyBehavior>
                <a style={{
                  display: 'block',
                  padding: '12px 16px',
                  color: router.pathname === '/' ? '#805ad5' : '#4a5568',
                  fontWeight: router.pathname === '/' ? '600' : '500',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  background: router.pathname === '/' ? 'rgba(128, 90, 213, 0.1)' : 'transparent',
                  marginBottom: '4px'
                }}
                onClick={() => setMenuOpen(false)}
                >
                  {t('booking_list')}
                </a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a style={{
                  display: 'block',
                  padding: '12px 16px',
                  color: router.pathname === '/about' ? '#805ad5' : '#4a5568',
                  fontWeight: router.pathname === '/about' ? '600' : '500',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  background: router.pathname === '/about' ? 'rgba(128, 90, 213, 0.1)' : 'transparent',
                  marginBottom: '4px'
                }}
                onClick={() => setMenuOpen(false)}
                >
                  {t('about') || '关于'}
                </a>
              </Link>
              <Link href="/price" legacyBehavior>
                <a style={{
                  display: 'block',
                  padding: '12px 16px',
                  color: router.pathname === '/price' ? '#805ad5' : '#4a5568',
                  fontWeight: router.pathname === '/price' ? '600' : '500',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  background: router.pathname === '/price' ? 'rgba(128, 90, 213, 0.1)' : 'transparent',
                  marginBottom: '4px'
                }}
                onClick={() => setMenuOpen(false)}
                >
                  {t('price') || '价格'}
                </a>
              </Link>
              
              {isLoggedIn && (
                <button
                  style={{
                    width: '100%',
                    background: '#805ad5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px 16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginTop: '8px'
                  }}
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default NavBar 