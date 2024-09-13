import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day9 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchMyUser();
  }, []);

  const fetchMyUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.data.data);
    } catch (error) {
      localStorage.removeItem('token');
    }
  };

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPosts([]);
      return;
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1da1f2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      localStorage.removeItem('token');
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out.",
        timer: 1500,
      });
      navigate('/authentication');
    }
  };

  return (
    <div className="container">
      <header className="profile-header">
        <div className="profile-image">
          <img src="/medc.jpeg" alt="Profile" />
        </div>
        <div className="profile-details">
          <h1>{user?.first_name} {user?.surname}</h1>
          <p>Email: {user?.email}</p>
          <p>Phone Number: {user?.phone_number}</p>
          <p className="role"></p>
        </div>
      </header>

      <section className="job-experience">
        <h2>Software Engineer</h2>
        <div className="experience-item">
          <h3></h3>
          <p>Graduated from SOUTSAKA INSTUTE OF TECNOLOGY</p>
          <p>Major: Computor science </p>
          
        </div>
        <h2>Skills</h2>
        <p className="skills">AI, Python, Java, C#, C++, SQL, PHP, HTML, CSS, Vue, React</p>
      </section>

      <button onClick={handleLogout}>Log Out</button>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #F4ECDA;
        }

        .profile-header {
          display: flex;
          align-items: center;
          border-bottom: 2px solid #e1e8ed;
          padding-bottom: 20px;
          margin-bottom: 20px;
          background-color: #FFFFFF;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
        }

        .profile-image img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 20px;
          border: 4px solid #e1e8ed;
        }

        .profile-details {
          flex: 1;
        }

        .profile-details h1 {
          margin: 0;
          font-size: 28px;
          color: #14171a;
          font-weight: 700;
        }

        .profile-details p {
          margin: 5px 0;
          color: #657786;
        }

        .profile-details .role {
          font-weight: 600;
          font-size: 24px;
          color: BLACK;
        }

        .job-experience {
          margin-top: 20px;
          padding: 20px;
          background-color: #F4ECDA;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .job-experience h2 {
          font-size: 24px;
          color: #14171a;
          margin-bottom: 15px;
        }

        .experience-item {
          margin-bottom: 15px;
        }

        .experience-item h3 {
          font-size: 20px;
          color: #14171a;
          margin: 0;
        }

        .experience-item p {
          color: Black;
        }

        .skills {
          color: #14171a;
          font-weight: 500;
        }

        button {
          padding: 12px 20px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          background-color: #1da1f2;
          color: white;
          font-size: 16px;
          transition: background-color 0.3s ease;
          margin-top: 20px;
        }

        button:hover {
          background-color: #1991db;
        }
      `}</style>
    </div>
  );
};

export default Day9;
