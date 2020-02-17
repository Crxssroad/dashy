import React, { useState } from 'react'
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom'
import { useDrag } from 'react-dnd'

const RSSWidget = ({ settings, parentIndex }) => {
  const [imageError, setImageError] = useState(false)
  const data = settings.data
  const [{isDragging}, drag] = useDrag({
    item: { type: 'WidgetChild', parentIndex: parentIndex },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const articles = data.items.map((article, index) => {
    let outerClass = "carousel-item"
    if (index === 0) outerClass += " active"
    const cleanContent = DOMPurify.sanitize(article.description);
    const description = <div dangerouslySetInnerHTML={{ __html: cleanContent }} />;
    return(
      <div className={outerClass} key={index}>
        <a className="d-block w-100" href={article.guid} target="_blank">
          <p>{article.title}</p>
        </a>
        {description}
      </div>
    )
  })
  let image = <img src={data.feed.image} onError={event => {setImageError(true);}}/>
  if (imageError) image = null
  return(
    <div className="rss-widget widget-child"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <h4>
        <i className="fas fa-rss"></i>
        {image}
        <p>{data.feed.title.replace(/&lt;/g, '<').replace(/&gt;/g, '>')}</p>
      </h4>
      <div id={`rssCarousel-${parentIndex}`} className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {articles}
        </div>
        <a className="carousel-control-prev" href={`#rssCarousel-${parentIndex}`} role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href={`#rssCarousel-${parentIndex}`} role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

    </div>
  )
}

export default RSSWidget
