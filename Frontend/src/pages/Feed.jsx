import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FeedCard from "../components/FeedCard"

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get("posts/");
      setPosts(res.data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="feed-body">
        {loading ? (
          <h2>loading...</h2>
        ):(
          <div className="card">
            {
              posts.map((post)=>(
                <FeedCard
                  key={post.id}
                  feed={post}
                  onClick={()=>navigate(`/post/${post.id}`)}
                />
              ))
            }
          </div>
        )}
      </div>
    </>
  );
};

export default Feed;
