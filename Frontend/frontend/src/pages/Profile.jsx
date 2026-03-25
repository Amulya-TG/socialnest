import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import axios from "axios";
import Navbar from "../components/Navbar";
import SwitchAccount from "../components/SwitchAccount";

function Profile() {

  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {

      try {

        const profileRes = await API.get("users/profile/");
        setProfile(profileRes.data);

        const postsRes = await API.get("posts/my-posts/");
        setPosts(postsRes.data);

      } catch (error) {

        console.error("Error loading profile data:", error);

      }

    };

    fetchData();

  }, []);

  const createPost = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("caption", caption);
    formData.append("image", image);

    await API.post("posts/create/", formData);

    alert("Post Created");

    const postsRes = await API.get("posts/my-posts/");
    setPosts(postsRes.data);

    setCaption("");
    setImage(null);

    setShowModal(false);

  };

const logout = async () => {

  const save = window.confirm("Save this account?");

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const active = localStorage.getItem("activeAccount");

  let updated = accounts;

  if (!save) {
    updated = accounts.filter(a => a.username !== active);
    localStorage.setItem("accounts", JSON.stringify(updated));
  }

  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("activeAccount");

  // auto login next account
  if (updated.length > 0) {

    const next = updated.find(acc => acc.username !== active) || updated[0];

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/refresh/",
        { refresh: next.refresh }
      );

      const newAccess = res.data.access;

      localStorage.setItem("token", newAccess);
      localStorage.setItem("refresh", next.refresh);
      localStorage.setItem("activeAccount", next.username);

      window.location.href = "/home";

    } catch {

      // refresh expired
      window.location.href = "/switch-account";

    }

  } else {

    window.location.href = "/";

  }

};
  return (
    <>
    <Navbar/>
      <h2>Profile</h2>
      {profile.profile_image && (
        <img
          src={
            profile.profile_image.startsWith("http")
              ? profile.profile_image
              : `http://127.0.0.1:8000${profile.profile_image}`
          }
          width="120"
          style={{ borderRadius: "50%" }}
        />

      )}

      <h3>{profile.username}</h3>

      <p>{profile.bio}</p>

      <hr />

      {/* CREATE POST BUTTON */}

      <button
        onClick={() => setShowModal(true)}
        style={{
          fontSize: "25px",
          padding: "5px 15px",
          cursor: "pointer",
        }}
      >
        +
      </button>

      <hr />

      {/* MODAL */}

      {showModal && (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >

            <h3>Create Post</h3>

            <form onSubmit={createPost}>

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <br/><br/>

              <input
                type="text"
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <br/><br/>

              <button type="submit">Post</button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      )}

      <h3>My Posts</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px",
        }}
      >

        {posts.map((post) => (

          <div key={post.id}>

            {post.image && (

              <img
                src={post.image}
                style={{ width: "100%", borderRadius: "8px" }}
              />

            )}

            <h4>{post.caption}</h4>

            <p>❤️ {post.likes_count} Likes</p>

          </div>

        ))}

      </div>

      <br/>
        <SwitchAccount/>
      <button type="button" onClick={logout}>
        Logout
      </button>

    </>

  );

}

export default Profile;