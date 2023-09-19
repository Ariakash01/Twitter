import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

const Editposts = ({posts,editTitle, setEditTitle, editBody,setEditBody,handleEdit}) => {
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id);
    useEffect(()=>{
      setEditTitle(post.title)
      setEditBody(post.body);
    },[post])
  
  return (
    <main className='NewPost'>
    <h1>You are Now Edit!!</h1>
    <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
      <label htmlFor="editTitle">Title:</label>
      <input 
      id='editTitle'
      type="text"
      required
      placeholder='please fill...'
      value={editTitle}
      onChange={(e)=>setEditTitle(e.target.value)}
      />
      <label htmlFor="editBody">Post:</label>
      <textarea 
      id="editBody"
         required
         value={editBody}
         onChange={(e)=>setEditBody(e.target.value)}     
      ></textarea>
       {editTitle &&
      <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
       }
    </form>
</main>
  )
}

export default Editposts