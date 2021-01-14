import { useEffect, useState } from 'react'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Modal from 'react-modal'

import { handleScrollTo } from '../helpers'

import Head from 'next/head'

// Motion
const variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
  },
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
  const [contactRef, contactInView] = useInView({
    threshold: 0.3,
  })
  const [drinks1Ref, drinks1InView] = useInView({
    threshold: 0.1,
  })
  const [drinks2Ref, drinks2InView] = useInView({
    threshold: 0.1,
  })
  const [drinks3Ref, drinks3InView] = useInView({
    threshold: 0.1,
  })

  const query = `
    query getAllContent {
      header(id: "6fOI5PfCdJEicQ4Wx7iEtp") {
        taglineTop
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
      foodGallery(id: "3N5YyNljcPbylpnX0p0W8m") {
        imageCollection {
          items {
            title
            url
          }
        }
      }
      drinksCollection {
        items {
          name
          description
          price
          cocktail
          swamplandSundays
          happyHourSpecials
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

  const [showModal, setShowModal] = useState(false)

  // Subscribe variables
  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [zipcode, setZipcode] = useState('')

  if (!data) return <span>Loading</span>

  return (
    <ParallaxProvider>
      <Head>
        <title>Swamplands Bar - 744 High Street Thornbury, VIC, Australia 3071</title>
      </Head>
      <header className={`header ${pageScrolled ? 'with-bg' : 'default'}`}>
        <div className="header-section logo" onClick={() => handleScrollTo('top', 0)}>
          <h1 className={`typography--display1 ${pageScrolled ? 'smaller' : 'default'}`}>
            SWAMPLANDS BAR
          </h1>
        </div>

        <div className="tag-line">
          <div className="tag-line--top">{data.data.header.taglineTop}</div>
          {/* <div className="divider" /> */}
          <div className="tag-line--bottom">
            <strong>
              Happy Hour 5pm-7pm weekdays.
              <br />
              6pm-8pm Sat, 4pm-6pm Sun
            </strong>
          </div>
        </div>

        <nav className="header-section nav">
          <ul className="nav-ul">
            <li
              onClick={() => handleScrollTo('upcoming-shows', 0)}
              className={`mb-hide  typography__nav--links ${showsInView ? 'active' : 'inactive'}`}
            >
              {data.data.upcomingShowsHeroCollection.items[0].sectionTitle}
            </li>
            <li
              onClick={() => handleScrollTo('swamp-kitchen', 0)}
              className={`mb-hide  typography__nav--links ${kitchenInView ? 'active' : 'inactive'}`}
            >
              SWAMP KITCHEN
            </li>
            <li
              onClick={() => handleScrollTo('contact', 300)}
              className={`mb-hide  typography__nav--links ${contactInView ? 'active' : 'inactive'}`}
            >
              CONTACT
            </li>
            <li onClick={() => setShowModal(true)} className="typography__nav--links">
              SUBSCRIBE
            </li>
            <li className="typography__nav--links social--list-item">
              <ul>
                <li className="typography__nav--links social social-fb">
                  <a href="https://www.facebook.com/swamplandsbar">FB</a>
                </li>
                <li className="typography__nav--links social social-in">
                  <a href="https://www.instagram.com/swamplandsbar">IN</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <Parallax y={[-20, 0]} tagOuter="hero">
          <section
            className={`hero ${pageScrolled ? 'filtered' : 'default'}`}
            style={{ backgroundImage: `url(${data.data.heroCollection.items[0].image.url})` }}
          />

          <div className="down">
            <button onClick={() => handleScrollTo('upcoming-shows', 0)}>Down</button>
          </div>
        </Parallax>
      </div>

      <section className="section section--shows" id="upcoming-shows" ref={showsRef}>
        <div className="section-wrapper">
          <div className="section-content">
            <motion.h1
              className={`typography--display2 ${showsInView ? 'underline-text' : 'default-text'}`}
              variants={variants}
              animate={showsInView ? 'visible' : 'hidden'}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
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
        </div>
        <Parallax y={[-20, 20]} tagOuter="hero">
          <div
            className="section-hero"
            style={{
              backgroundImage: `url(${data.data.upcomingShowsHeroCollection.items[0].image.url})`,
            }}
          />
        </Parallax>
      </section>

      <section className="section section--swamp-kitchen" id="swamp-kitchen" ref={kitchenRef}>
        <div className="section-content">
          <div className="menu">
            <section>
              <motion.h1
                className={`typography--display2 ${
                  kitchenInView ? 'underline-text' : 'default-text'
                }`}
                variants={variants}
                animate={kitchenInView ? 'visible' : 'hidden'}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
              >
                Swamp Kitchen
              </motion.h1>
              <div className="card-group">
                {data.data.swampKitchenCollection.items.map((i) => {
                  return (
                    <div className="menu-item">
                      <div className="menu-item--details">
                        <h2 className="typography__card--display3 typography--uppercase">
                          {i.title}
                        </h2>
                        <p className="typography__card--body">{i.details}</p>
                      </div>
                      <div className="menu-item--price">
                        <h3>{i.price}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="gallery">
                {data.data.foodGallery.imageCollection.items.map((i) => {
                  return (
                    <div className="gallery-item">
                      <img src={i.url} alt={i.title} />
                    </div>
                  )
                })}
              </div>
            </section>

            <section ref={drinks1Ref}>
              <motion.h1
                className={`typography--display2 ${
                  drinks1InView ? 'underline-text' : 'default-text'
                }`}
                variants={variants}
                animate={drinks1InView ? 'visible' : 'hidden'}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
              >
                Swampland Happy Hour Specials
              </motion.h1>
              <div className="card-group">
                {data.data.drinksCollection.items
                  .filter((i) => i.happyHourSpecials)
                  .map((i) => {
                    return (
                      <div className="menu-item">
                        <div className="menu-item--details">
                          <h2 className="typography__card--display3 typography--uppercase">
                            {i.name}
                          </h2>
                          <p className="typography__card--body">{i.description}</p>
                        </div>
                        <div className="menu-item--price">
                          <h3>{i.price}</h3>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </section>

            <section ref={drinks2Ref}>
              <motion.h1
                className={`typography--display2 ${
                  drinks2InView ? 'underline-text' : 'default-text'
                }`}
                variants={variants}
                animate={drinks2InView ? 'visible' : 'hidden'}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
              >
                Swampland Sundays
              </motion.h1>
              <div className="card-group">
                {data.data.drinksCollection.items
                  .filter((i) => i.swamplandSundays)
                  .map((i) => {
                    return (
                      <div className="menu-item">
                        <div className="menu-item--details">
                          <h2 className="typography__card--display3 typography--uppercase">
                            {i.name}
                          </h2>
                          <p className="typography__card--body">{i.description}</p>
                        </div>
                        <div className="menu-item--price">
                          <h3>{i.price}</h3>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </section>

            <section ref={drinks3Ref}>
              <motion.h1
                className={`typography--display2 ${
                  drinks3InView ? 'underline-text' : 'default-text'
                }`}
                variants={variants}
                animate={drinks3InView ? 'visible' : 'hidden'}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
              >
                Happy Hour Cocktails
              </motion.h1>
              <div className="card-group">
                {data.data.drinksCollection.items
                  .filter((i) => i.cocktail)
                  .map((i) => {
                    return (
                      <div className="menu-item">
                        <div className="menu-item--details">
                          <h2 className="typography__card--display3 typography--uppercase">
                            {i.name}
                          </h2>
                          <p className="typography__card--body">{i.description}</p>
                        </div>
                        <div className="menu-item--price">
                          <h3>{i.price}</h3>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="section section--contact" ref={contactRef} id="contact">
        <h1 className="typography--display2 underline-text">Contact Us</h1>
        <div className="google-map">
          <small className="typography--body">
            To enquire about band bookings contact{' '}
            <a href="mailto:speakeasywordsandmusic@gmail.com">speakeasywordsandmusic@gmail.com</a>
            <br />
            <address className="address">
              744 High Street Thornbury, <br />
              VIC, Australia 3071
            </address>
          </small>
          <br />
          <br />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.455018584452!2d144.9990583158471!3d-37.75592773851024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad64566987db6c1%3A0x371da0d7e26c9f74!2sSwamplands%20Bar!5e0!3m2!1sen!2sau!4v1610364000242!5m2!1sen!2sau"
            width="100%"
            height="500px"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen={true}
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
      </section>
      <Modal style={customStyles} isOpen={showModal} contentLabel="Example Modal">
        <button className="close-btn" onClick={() => setShowModal(false)}>
          close
        </button>
        <div id="mc_embed_signup">
          <form
            action="https://mikkimichelle.us2.list-manage.com/subscribe/post?u=1eaf458ac88c41547a8db6977&amp;id=f26da82daa"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <h2>Subscribe</h2>
              <div className="indicates-required">
                <span className="asterisk">*</span> indicates required
              </div>

              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">
                  Email Address <span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                />
              </div>

              <div className="mc-field-group">
                <label htmlFor="mce-FNAME">First Name </label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  name="FNAME"
                  className=""
                  id="mce-FNAME"
                />
              </div>

              <div className="mc-field-group">
                <label htmlFor="mce-LNAME">Last Name </label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  name="LNAME"
                  className=""
                  id="mce-LNAME"
                />
              </div>

              <div className="mc-field-group">
                <label htmlFor="mce-MMERGE6">Zip Code </label>
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  name="MMERGE6"
                  className=""
                  id="mce-MMERGE6"
                />
              </div>

              <div id="mce-responses" className="clear">
                <div className="response" id="mce-error-response" style={{ display: 'none' }} />
                <div className="response" id="mce-success-response" style={{ display: 'none' }} />
              </div>
              <div aria-hidden="true">
                <div className="clear">
                  <input
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </ParallaxProvider>
  )
}

export default App
