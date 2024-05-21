import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";

function Posts() {
  const posts = useSelector((state) => state.posts.entities.posts);

  let content = null;
  if (posts) {
    content = posts.map((post) => (
      <li
        key={post.id}
        className="desktop:w-1/4 tablet:w-2/5 mobile:w-full border border-fuchsia-900 rounded-md">
        <div className="p-5">
          <h2 className="text-2xl font-bold pb-4">{post.title}</h2>
          <p className="pb-3">{post.body}</p>
          <div className="flex gap-5">
            {post.tags.map((tag) => (
              <button
                key={tag}
                className="border p-2 rounded border-fuchsia-950 font-light text-fuchsia-950 hover:text-white hover:bg-fuchsia-950">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </li>
    ));
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="py-5 font-semibold text-3xl">Posts</h1>
        <ul className="flex flex-wrap gap-5 justify-center">{content}</ul>
      </div>
    </>
  );
}

export default Posts;
