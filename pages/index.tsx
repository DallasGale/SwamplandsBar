import { useEffect, useState } from 'react'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { handleScrollTo } from '../helpers'

import Head from 'next/head'

// Motion
const variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

// Components
import Card from '../components/card'

const App = () => {
  const [showsRef, showsInView] = useInView({
    threshold: 0.1,
  })
  const [kitchenRef, kitchenInView] = useInView({
    threshold: 0.1,
  })

  const query = `
  query getAllContent {
    header(id: "6fOI5PfCdJEicQ4Wx7iEtp") {
      taglineTop
      taglineBottom
    }
    heroCollection {
      items {
        image {
          url
        }
      }
    }
    upcomingShowsHeroCollection {
      items {
        sectionTitle
        image {
          url
        }
      }
    }
    swampKitchenCollection {
      items {
        title
        details
        price
      }
    }
    showsCollection(order:date_ASC) {
      items {
        name
        date
        image {
          url
        }
        description
      }
    }
  }
  
  `
  let [data, setData] = useState(null)

  useEffect(() => {
    window
      .fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        }
      )
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [])

  const [pageScrolled, setPageScrolled] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        setPageScrolled(true)
      } else {
        setPageScrolled(false)
      }
    })

    return () => {
      window.removeEventListener('scroll', () => null)
    }
  }, [])

  if (!data) return <span>Loading</span>

  return (
    <ParallaxProvider>
      <Head>
        <title>Next.js + Contentful</title>
      </Head>
      <header className={`header ${pageScrolled ? 'with-bg' : 'default'}`}>
        <div className="header-section logo" onClick={() => handleScrollTo('top', 0)}>
          <h1 className={`logo-text ${pageScrolled ? 'smaller' : 'default'}`}>SWAMPLANDS BAR</h1>
        </div>

        <div className="tag-line">
          <div className="tag-line--top">{data.data.header.taglineTop}</div>
          <div className="divider" />
          <div className="tag-line--bottom">
            <strong>{data.data.header.taglineBottom}</strong>
          </div>
        </div>

        <nav className="header-section nav">
          <ul className="nav-ul">
            <li onClick={() => handleScrollTo('swamp-kitchen', -100)} className="nav-li">
              SWAMP KITCHEN
            </li>
            <li onClick={() => handleScrollTo('upcoming-shows', -100)} className="nav-li">
              {data.data.upcomingShowsHeroCollection.items[0].sectionTitle}
            </li>
            <li onClick={() => handleScrollTo('swamp-kitchen', -100)} className="nav-li">
              MAILING LIST
            </li>
            <li onClick={() => handleScrollTo('swamp-kitchen', -100)} className="nav-li">
              CONTACT
            </li>
          </ul>
        </nav>
      </header>

      <Parallax y={[-30, 0]} tagOuter="hero">
        <section
          className={`hero ${pageScrolled ? 'filtered' : 'default'}`}
          style={{ backgroundImage: `url(${data.data.heroCollection.items[0].image.url})` }}
        />
      </Parallax>

      <section className="section" id="upcoming-shows" ref={showsRef}>
        <div className="section-content">
          <motion.h1
            className={`section-title ${showsInView ? 'underline-text' : 'default-text'}`}
            variants={variants}
            animate={showsInView ? 'visible' : 'hidden'}
            transition={{ ease: 'easeOut', duration: 0.7 }}
          >
            {data.data.upcomingShowsHeroCollection.items[0].sectionTitle}
          </motion.h1>
          <div className="card-group">
            {data.data.showsCollection.items
              .sort((i) => i.date)
              .map((i) => {
                return (
                  <Card name={i.name} date={i.date} description={i.description} image={i.image} />
                )
              })}
          </div>
        </div>
        <div
          className="section-hero"
          style={{
            backgroundImage: `url(${data.data.upcomingShowsHeroCollection.items[0].image.url})`,
          }}
        />
      </section>

      <section className="section" id="swamp-kitchen" ref={kitchenRef}>
        <div className="section-content">
          <Parallax y={[-30, 30]} tagOuter="kitchen">
            <motion.h1
              className={`section-title ${kitchenInView ? 'underline-text' : 'default-text'}`}
              variants={variants}
              animate={kitchenInView ? 'visible' : 'hidden'}
              transition={{ ease: 'easeOut', duration: 0.7 }}
            >
              Swamp Kitchen
            </motion.h1>

            <div className="menu card-group">
              {data.data.swampKitchenCollection.items.map((i) => {
                return (
                  <div className="menu-item">
                    <h1>{i.title}</h1>
                    <h2>{i.details}</h2>
                    <h3>${i.price}</h3>
                  </div>
                )
              })}
            </div>
          </Parallax>
        </div>
      </section>
    </ParallaxProvider>
  )
}

export default App
