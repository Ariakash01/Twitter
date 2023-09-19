import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
        <article className='post'>
           <Link to={`newpost/${post.id}`}><h2>{post.title}</h2>
           <p className='postBody'>{(post.body).length<=25? post.body:`${(post.body).slice(0,25)} ...`}</p>
           </Link>
          <p className='postDate'>{post.date}</p>
        </article>
  )
}

export default Post