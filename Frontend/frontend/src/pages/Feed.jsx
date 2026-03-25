import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Feed() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await API.get("posts/");
      setPosts(res.data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await API.post(`posts/like/${postId}/`);
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>Feed</h2>
        {posts.map((post) => (
          <div key={post.id} className="feed-body">
            <h4>{post.user}</h4>
            {post.image && (
              <img
                src={post.image}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}
            <p>{post.caption}</p>

            <button onClick={() => handleLike(post.id)}>
              ❤️ {post.likes_count} Like
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Feed;
