import Posts from "../components/posts/Posts";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPost,
  fetchPosts,
  fetchPostsFromSearch,
} from "../redux/postsSlice";
import { Puff } from "react-loader-spinner";
import { CiSearch } from "react-icons/ci";
import ButtoN from "../components/button/ButtoN";
import { BsPlus } from "react-icons/bs";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.entities.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [isloaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");

  useLayoutEffect(() => {
    if (!isloaded) {
      dispatch(fetchPosts());
      setIsLoaded(true);
    }
  }, [isloaded, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center my-72">
        <Puff
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (status === "error") {
    return <div>Error: {error}</div>;
  }

  const handleSearchTerm = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  const handleSearchSubmit = (searchTerm) => {
    dispatch(fetchPostsFromSearch(searchTerm));
  };

  const handlePostSubmit = () => {
    const newPost = {
      title,
      body,
      userId: Number(userId),
      tags: tags.split(",").map(tag => tag.trim()),
    };
    dispatch(addNewPost(newPost));
  };

  const handleTag = (e)=>{
    setTags(e.target.value)
    console.log(tags);
  }

  const renderSearchModalContent = (handleClose) => (
    <div className="flex flex-col justify-center gap-5">
      <h2 id="modal-modal-title">Search</h2>
      <input
        className="p-2 border-b focus:outline-none  border-b-slate-400"
        id="modal-modal-description"
        type="text"
        placeholder="Search term"
        value={search}
        onChange={(e) => handleSearchTerm(e)}
      />
      <div className="flex justify-center gap-40">
        <button
          className="bg-green-900 text-white px-4 py-2 rounded"
          type="submit"
          onClick={handleSearchSubmit}>
          Submit
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded"
          onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );

  const renderAddPostModalContent = (handleClose) => (
    <div className="flex flex-col justify-center gap-5">
      <h2 id="modal-modal-title">Add Post</h2>
      <input
        id="modal-modal-description"
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="p-2 border-b focus:outline-none  border-b-slate-400"
      />
      <input
        id="modal-modal-description"
        type="number"
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
        className="p-2 border-b focus:outline-none  border-b-slate-400"
      />
      <textarea
        className="p-2 border-b focus:outline-none  border-b-slate-400"
        placeholder="Body Blog"
        value={body}
        onChange={(e) => setBody(e.target.value)}></textarea>
      <select
       onChange={(e) => handleTag(e)}
       value={tags}
       className="p-2 border-b focus:outline-none  border-b-slate-400">
        {posts
          ? posts.map((post) =>
              post.tags.map((tag) => (
                <option
                  value={tags}
                  key={tag}
                  >
                  {tag}
                </option>
              ))
            )
          : ""}
      </select>
      <div className="flex justify-center gap-40">
        <button
          className="bg-green-900 text-white px-4 py-2 rounded"
          type="submit"
          onClick={handlePostSubmit}>
          Submit
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded"
          onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Posts />
      <div className="sticky w-fit h-fit bottom-10 ms-10 flex flex-col gap-6">
        <ButtoN modalContent={renderSearchModalContent}>
          <CiSearch />
        </ButtoN>
        <ButtoN modalContent={renderAddPostModalContent}>
          <BsPlus />
        </ButtoN>
      </div>
    </div>
  );
}

export default HomePage;
