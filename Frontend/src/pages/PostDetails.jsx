import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const res = await API.get(`posts/${id}/`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleLike = async (postId) => {
    try {
      await API.post(`posts/like/${postId}/`);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
      <div>
        <h3>{post.user}</h3>
        <img src={post.image} style={{ width: "100%" }} />
        <p>{post.caption}</p>
        <button onClick={() => handleLike(post.id)}>
          ❤️ {post.likes_count} Like
        </button>
      </div>
    </>
  );
};

export default PostDetails;
