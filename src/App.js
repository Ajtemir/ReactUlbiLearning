import React, {useState} from 'react';
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Javascript', body: 'Description'},
        { id: 2, title: 'Javascript 2', body: 'Description 2'},
        { id: 3, title: 'Javascript 3', body: 'Description 3'},
    ]);

  return (
    <div className="App">
        <form action="">
            <MyInput type="text" placeholder="Название поста"/>
            <MyInput type="text" placeholder="Описание поста"/>
            <MyButton disabled>Создать пост</MyButton>
        </form>
        <PostList posts={posts} title='Посты про JS'/>
    </div>
  );
}

export default App;
