import React, {useMemo, useRef, useState} from 'react';
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'a Javascript', body: 'c Description'},
        { id: 2, title: 'b Javascript 2', body: 'b Description 2'},
        { id: 3, title: 'c Javascript 3', body: 'a Description 3'},
    ]);

    const [filter, setFilter] = useState({
        sort: '',
        query:'',
    })


    const sortedPosts = useMemo(() => {
        console.log('Отработала функция Sorted Posts')
        if(filter.sort) {
            return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    // Получаем post from descendant-component
    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter} />
        {
            sortedAndSearchedPosts.length !== 0
                ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
                : <h1 style={{textAlign : 'center'}}>Посты не были найдены!</h1>
        }

    </div>
  );
}

export default App;
