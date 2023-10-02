import React, {useRef, useState} from 'react';
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Javascript', body: 'Description'},
        { id: 2, title: 'Javascript 2', body: 'Description 2'},
        { id: 3, title: 'Javascript 3', body: 'Description 3'},
    ]);


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    // Получаем p
    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
    }


  return (
    <div className="App">
        <PostForm create={createPost}/>
        {
            posts.length !== 0
                ? <PostList remove={removePost} posts={posts} title='Посты про JS'/>
                : <h1 style={{textAlign : 'center'}}>Посты не были найдены!</h1>
        }

    </div>
  );
}

export default App;
