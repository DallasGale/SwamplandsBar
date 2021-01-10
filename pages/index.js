import { useEffect, useState } from 'react'

import Head from 'next/head'


const App = () => {

  const query = `
  query getAllContent {
    swampKitchenCollection {
      items {
        title
        details
        price
      }
    }
    showsCollection {
      items {
        name
        date
        image {
          url
        }
        description
        day
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

  if (!data) return <span>Loading</span>

  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
        <link rel="stylesheet" href="https://css.zeit.sh/v1.css" type="text/css" />
      </Head>

      <h2>Upcoming Shows</h2>
      {data.data.showsCollection.items.map((i) => {
        console.log('i', i)
        return (
          <div>
            <h1>{i.name}</h1>
            <h2>{i.date}</h2>
            <h3>{i.description}</h3>
            <h4>{i.day}</h4>
            <img src={i.image.url} />
          </div>
        )
      })}

      <h2>Swamp Kitchen</h2>
      {data.data.swampKitchenCollection.items.map((i) => {
        return (
          <div>
            <h1>{i.title}</h1>
            <h2>{i.details}</h2>
            <h3>${i.price}</h3>
          </div>
        )
      })}
    </>
  )
}

export default App
