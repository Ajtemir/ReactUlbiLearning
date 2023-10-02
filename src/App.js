import React, {useRef, useState} from 'react';
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'a Javascript', body: 'c Description'},
        { id: 2, title: 'b Javascript 2', body: 'b Description 2'},
        { id: 3, title: 'c Javascript 3', body: 'a Description 3'},
    ]);

    const [selectedSort, setSelectedSort] = useState('')


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    // Получаем p
    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)
        setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
    }


  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <div>
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                ]}
            />
        </div>
        {
            posts.length !== 0
                ? <PostList remove={removePost} posts={posts} title='Посты про JS'/>
                : <h1 style={{textAlign : 'center'}}>Посты не были найдены!</h1>
        }

    </div>
  );
}

export default App;
