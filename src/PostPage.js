import React from 'react'
import { Link } from 'react-router-dom';
import {  useParams } from 'react-router-dom'
const PostPage = ({posts,handleDelete}) => {
  const { id }=useParams();
  const post=posts.find(post=>(post.id).toString()===id);
  return (
    <main className='PostPage'>
    <article className='post'>
           <h2>{post.title}</h2>
           <p className='postBody'>{post.body}</p>
          <p className='postDate'>{post.date}</p>
          <Link to={`/edit/${post.id}`}>
      <button className='editButton' type='submit'>edit</button>
      </Link>
          <button className='deleteButton' onClick={()=>handleDelete(post.id)}>delete</button>
    </article>
</main>
  )
}

export default PostPage