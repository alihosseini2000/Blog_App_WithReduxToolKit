import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/postsSlice";
import { Puff } from "react-loader-spinner";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.entities.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchPosts());
      setLoaded(true);
    }
  }, [loaded, dispatch]);

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

  let content = null;
  if (posts) {
    content = posts.map((post) => <li key={post.id}>{post.title}</li>);
  }

  return (
    <div>
      <h1>posts</h1>
      <ul>{content}</ul>
    </div>
  );
}

export default Posts;
