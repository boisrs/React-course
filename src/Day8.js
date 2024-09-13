import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day8 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loginData, setLoginData] = useState({
    email: "cackkaphatsirisang@gmail.com",
    password: "195455",
  });
  const [signupData, setSignupData] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(()=>{
    fetchPosts()
    fetchMyUser()
  },[])

  const fetchMyUser = async ()=>{
    try{
      const token =localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/me`,{
        headers: {Authorization: `Bearer ${token}`}
      })
      setUser(response.data.data.data)
    }catch(error){
      localStorage.removeItem('token')
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, loginData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
          text: `ຍິນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ",
        text: "ກະລຸນາກວດສອບຂ້ໍມູນຂອງທ່ານແລ້ວລອງໃຫມ່ອີກຄັ້ງ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, signupData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
          text: `ຍິນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ",
        text: "ກະລຸນາກວດສອບຂ້ໍມູນຂອງທ່ານແລ້ວລອງໃຫມ່ອີກຄັ້ງ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPosts([]);
      return;
    }
    setIsPostsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.data.posts);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsPostsLoading(false);
    }
  };

  
  const handleLogout= async () => {
    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "You will can restore is action",
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
    });
    if(result.isConfirmed) {
      localStorage.removeItem('token');
      Swal.fire({
        icon: "success",
        title: "Log Out",
        tetx: "Thanks!",
        timer: 1500,
      });
      navigate('/authentication')
    };}

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "Please login to perform this action!",
      });
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/posts`,
        { content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPost("");
      fetchPosts();
      Swal.fire({
        icon: "success",
        title: "Create a new post successfully!",
        text: "You have already posted!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Cannot create a new post!",
        text: "Something went wrong, please try again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formDateTime=(isoString) =>{
    const date = new Date(isoString)
    date.setHours(date.getHours()+7)
    const padZero = (num)=>num.toString().padStart(2,'0');
    const day = padZero(date.getUTCDate())
    const month = padZero(date.getUTCMonth()+1)
    const year = padZero(date.getUTCFullYear())
    let hour = date.getUTCHours();
    const minute = padZero(date.getUTCMinutes())
    const ampm = hour>= 12? "PM":"AM";
    hour = hour % 12;
    hour = hour ? hour :12;
    hour = padZero(hour)
    return`${day}-${month}-${year} ${hour}:${minute}:${ampm}`
  }

  const handleDelete = async (postId) => {
    const token =localStorage.getItem("token")
    if (!token) {
      Swal.fire({
        title: "Please Login",
        icon: "warning",
        text: "Please Login For Delete Post!"
      })
      return;
    }const result = await Swal.fire({
      title: "Are You Sure?",
      text: "You will can restore is action",
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
    });
    if(result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}`},
        });
        Swal.fire("Delete!", "Your Post Deleted", "success");
        fetchPosts();
      } catch (error){
        Swal.fire("Error!", error?.response?.data?.message ?? "Error can't Delete Post, please Try Agine!","error"
        );
      }
      
    };
  }
  

  const handleLike = async (postId) => {
    const token =localStorage.getItem("token")
    if (!token) {
      Swal.fire({
        title: "Please Login",
        icon: "warning",
        text: "Please Login For Delete Post!"
      })
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "Liked",
          text: "you Liked Post",
          timer: 1500,
          showCancelButton: false,
        });
      }
    } catch (error){
      Swal.fire("Error!", error?.response?.data?.message ?? "Error can't Liked Post, please Try Agine!","error"
      );
    }
  }
  
    

  return (
    <div className="container">
      <h1>login and Post, CRUD and Router SYSTEM</h1>

      {isLoading && <div className="loading">Loading...</div>}

      <div>
          <h2>Hello, {user?.first_name}!</h2>
          <p>Email: {user?.email}</p>
          <p>Phone Number: {user?.phone_number}</p>
          <p>ສິດທິ: {user?.role}</p>
          <button onClick={handleLogout}>Log Out</button>

          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="New Post"
            ></textarea>
            <button type="submit" disabled={isLoading}>
              New Post
            </button>
          </form>

          <h2>Post</h2>
          <button
            onClick={() => {
              fetchPosts();
            }}
          >
            Refresh posts
          </button>
          {isPostsLoading ? (
            <div className="loading">Loading Post...</div>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post._id}>
                  <button onClick={()=>{handleDelete(post._id)}}>Delete</button>
                  <p>Time: {formDateTime(post.createdAt)}</p>
                  <p>Writer: {post.author.first_name}</p>
                  <p>{post.content}</p>
                  <p>Like: {post.likes ? post.likes.length : 0}</p>
                  <button onClick={()=>{
                    handleLike(post._id)
                  }}>Like</button>
                  <Link to={`/edit/${post._id}`}>Edit</Link>
                </li>
              ))}
            </ul>
          )}

          
        </div>
      <style jsx>
        {`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .tabs {
            display: flex;
            margin-bottom: 20px;
          }
          .tabs button {
            flex: 1;
            padding: 10px;
            border: none;
            background-color: #f1f1f1;
            cursor: pointer;
          }
          .tabs button.active {
            background-color: #4caf50;
            color: white;
          }
          form {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          }
          input,
          textarea {
            margin-bottom: 10px;
            padding: 5px;
          }
          button {
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            cursor: pointer;
          }
          button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            background-color: #f1f1f1;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 5px;
          }
          .loading {
            text-align: center;
            padding: 20px;
            font-style: italic;
            color: #666;
          }
        `}
      </style>
    </div>
  );
};

export default Day8;
