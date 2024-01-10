import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import axiosInstance from "../utils/axiosInstance";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    // Navigate to the edit page
    navigate(`/write?edit=${postId}`, { state: post });
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post?.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            {post?.username && <span>{post.username}</span>}
            {post?.date && <p>Posted {moment(post.date).fromNow()}</p>}
          </div>
          {currentUser?.username === post?.username && (
            <div className="edit">
              <button onClick={handleEdit}>
                <img src={Edit} alt="" />
              </button>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        {post?.title && <h1>{post.title}</h1>}
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.desc || ""),
          }}
        ></p>
      </div>
      <Menu cat={post?.cat} />
    </div>
  );
};

export default Single;
