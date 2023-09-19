import { useState,useEffect } from "react";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { format } from 'date-fns';
import {Routes,Route, useNavigate, }from "react-router-dom";
import abi from "./abi/posts"
import Editposts from "./Editposts";

function App() {
const navigate=useNavigate()
const [posts,setPosts]=useState([])
const [search,setSearch]=useState('')
const [searchResults,setSearchResults]=useState([])
const [postTitle,setPostTitle]=useState('')
const [postBody,setPostBody]=useState('')
const [editTitle,setEditTitle]=useState('')
const [editBody,setEditBody]=useState('')

useEffect(()=>{
  const fetchPosts=async()=>{
    try{
      const response=await abi.get('/posts');
      setPosts(response.data)
    }catch(err){
      if (err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }else{
        console.log(`Error:${err.message}`);
      }
    }
  }
  fetchPosts();
},[])


useEffect(()=>{
const filteredResults=posts.filter((post)=>((post.title).toLowerCase()).includes(search.toLowerCase())
  || ((post.body).toLowerCase()).includes(search.toLowerCase()));
 setSearchResults(filteredResults.reverse());
},[posts,search])
const handleSubmit=async(e)=>{
e.preventDefault();
 const id=posts.length?posts[posts.length-1].id+1:1;
 const date=format(new Date(),'MMMM dd,yyyy pp')
 const newPosts={id,title:postTitle,date,body:postBody}
 try{
 const response=await abi.post('/posts',newPosts)
 const allPosts=[...posts,response.data]
 setPosts(allPosts);
 setPostTitle('');
 setPostBody('');
 navigate('/')}catch(err){
  if (err.response){
    console.log(err.response.data)
    console.log(err.response.status)
    console.log(err.response.headers)
  }else{
    console.log(`Error:${err.message}`);
  }
}
}
const handleDelete=async(id)=>{
  try{
    await abi.delete(`posts/${id}`)
  const afterDelete=posts.filter(post=>post.id!==id)
  setPosts(afterDelete)
  navigate('/')}catch(err){
    if (err.response){
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
    }else{
      console.log(`Error:${err.message}`);
    }
  }
}
const handleEdit=async(id)=>{
  const date=format(new Date(),'MMMM dd,yyyy pp')
 const updatePosts={id,title:editTitle,date,body:editBody}
 try{
const response=await abi.put(`/posts/${id}`,updatePosts)
setPosts(posts.map(post=>post.id===id?{...response.data}:post));
setEditTitle('');
setEditBody('');
navigate('/')
 }catch(err){
  console.log(`Error:${err.message}`);
    }
}
  return (
    
  <div className="App">  
    <Header title="Twitter"/>
     <Nav 
     search={search}
     setSearch={setSearch}
     />
     <Routes>
         <Route path="/" element={<Home 
         posts={searchResults}
         />} />
          
        <Route path="newPost">
          <Route index element={<NewPost 
           postTitle={postTitle}
           postBody={postBody}
           setPostTitle={setPostTitle}
           setPostBody={setPostBody}
           handleSubmit={handleSubmit}
           />} />
           <Route path=":id" element={<PostPage 
           posts={posts}
           handleDelete={handleDelete}
           />}/>
         </Route>
         <Route path="/edit/:id" element={<Editposts 
         editTitle={editTitle}
         setEditTitle={setEditTitle}
         editBody={editBody}
         setEditBody={setEditBody}
         handleEdit={handleEdit}
         posts={posts}
         />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
     </Routes>
    <Footer />
    </div>
  );
  }

export default App;
