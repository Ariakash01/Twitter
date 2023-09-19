import React from 'react'
import Feed from './Feed'

const Home = ({posts}) => {
  return (
<main className='Home'>
        {posts.length?(<Feed posts={posts}/>):
           (<p>No Post To Display</p>)
        }
</main>
  )
}
export default Home