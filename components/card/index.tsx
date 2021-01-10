import React from 'react'
interface Props {
  name: string
  description: string
  date: Date
  image: {
    url: string
  }
}

const Card: React.FC<Props> = ({ description, date, name, image }) => {
  const bgImage = image ? image.url : 'https://placehold.co/600x400'

  const formattedDate = new Date(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) // 18 February 2019

  var weekday = new Array(7)
  weekday[0] = 'Sunday'
  weekday[1] = 'Monday'
  weekday[2] = 'Tuesday'
  weekday[3] = 'Wednesday'
  weekday[4] = 'Thursday'
  weekday[5] = 'Friday'
  weekday[6] = 'Saturday'
  var day = weekday[new Date(date).getDay()]

  return (
    <div className="card">
      <div className="card-content" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="card-details">
          <small className="card-day">{day}</small>
          <small className="card-date">{formattedDate}</small>
          <h1>{name}</h1>

          {description && (
            <>
              <div className="divider" />
              <p>{description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
