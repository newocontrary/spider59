import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import './Services.css'

const services = [
  { number: '01', title: 'Охрана квартир и недвижимости', description: 'Постановка квартиры, гаража или дачного дома на пульт централизованного наблюдения.', points: ['Монтаж сигнализации', 'Контроль объекта 24/7', 'Передача тревоги на пульт'], price: 'от 1 000 ₽', unit: '/ мес.' },
  { number: '02', title: 'Кнопка тревожной сигнализации', description: 'Незаметная передача тревожного сигнала при нападении или другой опасной ситуации.', points: ['Скрытая активация', 'Сигнал оператору', 'Выезд группы реагирования'], price: 'от 2 000 ₽', unit: '/ мес.' },
  { number: '03', title: 'Охрана коттеджей', description: 'Техническая охрана частного дома с подключением к круглосуточному пульту.', points: ['Контроль проникновения', 'Охрана территории', 'Возможность подключения КТС'], price: 'от 1 500 ₽', unit: '/ мес.' },
  { number: '04', title: 'Офисы, автостоянки и склады', description: 'Пультовая охрана коммерческих помещений и объектов хранения.', points: ['Контроль доступа', 'Тревожная сигнализация', 'Мониторинг объекта'], price: 'от 1 850 ₽', unit: '/ мес.' },
  { number: '05', title: 'Промышленные предприятия', description: 'Комплексная система безопасности территории и производственной инфраструктуры.', points: ['Контроль периметра', 'Видеонаблюдение', 'Обеспечение безопасности'], price: 'от 1 800 ₽', unit: '/ мес.' },
  { number: '06', title: 'Системы видеонаблюдения', titleLines: ['Системы', 'видеонаблюдения'], description: 'Системы контроля для дома, квартиры, офиса или магазина.', points: ['Запись и хранение', 'Круглосуточный обзор', 'Анализ видеоматериалов'], price: 'от 1 000 ₽', unit: '/ мес.' },
  { number: '07', title: 'Противопожарный мониторинг', titleLines: ['Противопожарный', 'мониторинг'], description: 'Контроль пожарных событий и передача сигнала для вызова пожарной службы.', points: ['Раннее обнаружение', 'Передача тревоги', 'Снижение возможного ущерба'], price: 'от 500 ₽', unit: '/ мес.' },
  { number: '08', title: 'КТС + GPS для автомобиля', description: 'Охрана автомобиля с тревожным сигналом и контролем местоположения онлайн.', points: ['GPS-мониторинг', 'История маршрутов', 'Оповещение о тревоге'], price: 'По договору' },
]

export default function Services() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.services__intro > *', { y: 28, opacity: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.services__intro', start: 'top 84%', once: true } })
      gsap.from('.service-item', { y: 32, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.services__grid', start: 'top 86%', once: true } })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="services" id="services" ref={root} aria-labelledby="services-title" data-pointer-ambient>
      <span className="pointer-ambient__glow" aria-hidden="true" />
      <span className="pointer-ambient__word" data-word="SERVICE" aria-hidden="true" />
      <div className="container">
        <div className="services__intro">
          <p className="eyebrow services__eyebrow"><span>02</span> / Услуги</p>
          <h2 id="services-title">Решения<br />для защиты</h2>
          <p>Тариф зависит от типа объекта и состава оборудования. Указана начальная стоимость по открытому прайс-листу ОА «Спайдер».</p>
        </div>
        <div className="services__grid">
          {services.map((service) => (
            <article className="service-item" key={service.number}>
              <span className="service-item__number">{service.number}</span>
              <h3>{(service.titleLines ?? [service.title]).map((line) => <span key={line}>{line}</span>)}</h3>
              <p>{service.description}</p>
              <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <div className="service-item__footer">
                <p className="service-item__price">{service.price} {service.unit && <small>{service.unit}</small>}</p>
                <a href="#contact" aria-label={`Обсудить услугу: ${service.title}`}><span>Обсудить</span><i aria-hidden="true">↗</i></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
