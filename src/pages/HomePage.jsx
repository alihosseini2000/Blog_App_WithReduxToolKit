import Posts from "../components/posts/Posts";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPost,
  fetchPosts,
  fetchPostsBySearchTerm,
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
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");


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
  };

  const handlePostSubmit = () => {
    const newPost = {
      title,
      body,
      userId: Number(userId),
      tags: selectedTags,
    };
    dispatch(addNewPost(newPost));
  };

  const handleTag = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTags(selectedTags);
  };  

  const handleSearchSubmit = async (searchTerm) => {
    setSearchStatus("loading");
    try {
      await dispatch(fetchPostsBySearchTerm(searchTerm));
      setSearchStatus("idle");
    } catch (error) {
      setSearchStatus("error");
      console.error("Error fetching posts:", error);
    }
  };
  

  const uniqueTags =
    posts?.reduce((acc, post) => {
      if (post.tags) {
        post.tags.forEach((tag) => {
          if (!acc.includes(tag)) {
            acc.push(tag);
          }
        });
      }
      return acc;
    }, []) || [];

  const renderSearchModalContent = (handleClose) => (
    <div className="flex flex-col justify-center gap-5">
      <h2 id="modal-modal-title">Search</h2>
      <input
        className="p-2 border-b focus:outline-none  border-b-slate-400"
        id="modal-modal-description"
        type="text"
        placeholder="Search term"
        value={search}
        onChange={handleSearchTerm}
      />
      <div className="flex justify-center gap-40">
        <button
          className="bg-green-900 text-white px-4 py-2 rounded"
          type="submit"
          onClick={() => handleSearchSubmit(search)}>
          Submit
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded"
          onClick={handleClose}>
          Close
        </button>
      </div>
      {searchStatus === "loading" && (
      <Puff
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    )}
    {searchStatus === "error" && (
      <div>Error: {error}</div>
    )}
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
        multiple
        onChange={handleTag}
        value={selectedTags}
        className="p-2 border-b focus:outline-none  border-b-slate-400">
        {uniqueTags.map((tag) => (
          <option value={tag} key={tag}>
            {tag}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-2">
            {tag}
            <button
              type="button"
              onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
              className="text-red-500">
              x
            </button>
          </span>
        ))}
      </div>
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
