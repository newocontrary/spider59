import { useEffect, useRef, useState } from 'react'
import Logo from '../Logo/Logo.jsx'
import Button from '../ui/Button/Button.jsx'
import './Header.css'

const links = [
  { label: 'Услуги', href: '#services' },
  { label: 'О компании', href: '#about' },
  { label: 'Контакты', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)

  useEffect(() => {
    const update = () => {
      const next = scrolledRef.current ? window.scrollY > 12 : window.scrollY > 32
      if (next === scrolledRef.current) return
      scrolledRef.current = next
      setScrolled(next)
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('keydown', handleKey)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className={`header${open ? ' header--open' : ''}${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__logo" aria-label="SPIDER — на главную"><Logo /></a>
        <nav className="header__nav" id="primary-navigation" aria-label="Основная навигация">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        </nav>
        <Button className="header__cta" href="#contact">Оставить заявку</Button>
        <button className="header__menu" type="button" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}
