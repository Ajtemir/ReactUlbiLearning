import React, {useEffect, useState} from 'react';
import Pagination from "../components/UI/pagination/Pagination";
import PostList from "../components/PostList";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import MyButton from "../components/UI/button/MyButton";
import PostFilter from "../components/PostFilter";
import {getPageCount} from "../utils/pages";
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query:'',})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    const [fetchPosts, isPostLoading, postError] = useFetching( async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit))
    })

    console.log(totalPages)

    useEffect(()  => {
        fetchPosts(limit, page)
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // Получаем post from descendant-component
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }
    return (
        <div className="App">
            {/*<button onClick={fetchPosts}>Get Posts</button>*/}
            <div className="post__btns">
                <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Создать пользователя
                </MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm create={createPost}/>
                </MyModal>
            </div>


            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter} />
            {
                postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }

            {
                isPostLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                    : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;