import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const EditPost = () => {
    const [EditPost, setEditPost] = useState('');
    const [postDetail, setPostDetail] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect (() => {
        const fetchPosts = async () => {
            const token =localStorage.getItem("token");
            try{
                const response =await axios.get(`${API_URL}/posts/${id}`,{
                    headers: {Authorization : `Bearer ${token}`}
                });
                setPostDetail(response.data.data.post);
                setEditPost(response.data.data.post.content);
            } catch (error){
                Swal.fire("Error", "Failed to fetch post","error");
            }
        };
        fetchPosts();
    }, [id]);
    const handleEdit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try{await axios.patch(
            `${API_URL}/posts/${id}`,
            {content: EditPost},
            {headers: {Authorization: `Bearer ${token}`}}
        );
        Swal.fire("Success", "Post update successfully","success")
        
        }
        catch (error){
            Swal.fire("Error", error?.response?.data?.message ?? "Failed to update post", "error")
        };
    }

    return (
        <div>
            <h2>Edit Post</h2>
            <h4>Writer: {postDetail?.author?.first_name} {postDetail?.author?.surname}</h4>
            <form onChange={handleEdit}>
                <textarea value={EditPost} 
                onChange={(e) => setEditPost(e.target.value)} 
                cols={30} 
                row={10} 
                placeholder="Edit Your Post"
                ></textarea>
                <button>Update Post</button>
            </form>
            <button onClick={() => navigate("/")}>back to Home Page</button>
        </div>
    );
}
export default EditPost;