import React from 'react'

const NewPost = ({postTitle,setPostTitle,postBody,setPostBody,handleSubmit}) => {
  return (
<main className='NewPost'>
    <h1>Newpost</h1>
    <form className='newPostForm' onSubmit={handleSubmit}>
      <label htmlFor="postTitle">Title:</label>
      <input 
      id='postTitle'
      type="text"
      required
      value={postTitle}
      onChange={(e)=>setPostTitle(e.target.value)}
      />
      <label htmlFor="PostBody">Post:</label>
      <textarea id="PostBody"
         required
         value={postBody}
         onChange={(e)=>setPostBody(e.target.value)}     
      ></textarea>
      <button type='submit'>Submit</button>
    </form>
</main>
  )
}
export default NewPost