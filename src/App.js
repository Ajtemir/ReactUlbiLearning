import React, {useRef, useState} from 'react';
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

    const [title, setTitle] = useState('Тема по дефолту...')
    const [body, setBody] = useState('Описание по дефолту...')


    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            id: Date.now(),
            title,
            body,
        }
        console.log(newPost)
    }

  return (
    <div className="App">
        <form>
            {/*Управляемый компонент*/}
            <MyInput

                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="Название поста"
            />

            {/*Неуправляемый компонент*/}
            <MyInput
                value={body}
                onChange={e => setBody(e.target.value)}
                type="text"
                placeholder="Описание поста"
            />

            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
        <PostList posts={posts} title='Посты про JS'/>
    </div>
  );
}

export default App;
