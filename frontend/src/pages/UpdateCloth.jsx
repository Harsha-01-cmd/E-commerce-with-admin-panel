import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateCloth = () => {
  const { clothid } = useParams();
  const [data, setData] = useState({
    url: "",
    title: "",
    agency: "",
    price: "",
    description: ""
  });
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-byid-public/${clothid}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [clothid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(data).some(field => field === "")) {
        setMessage("All fields are required");
        return;
      }
      const res = await axios.put(
        `http://localhost:1000/api/v1/update-cloth/${clothid}`,
        data,
        { headers }
      );
      setMessage(res.data.message);
      setData({ url: "", title: "", agency: "", price: "", description: "" });
      alert(res.data.message);
      navigate("/all-cloths")
    } catch (error) {
      setMessage(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className='h-auto bg-zinc-900 p-0 md:p-4'>
      <div className="text-3xl md:text-5xl bg-zinc-900 ont-semibold text-zinc-500 mb-8">
        Update Cloth Item
      </div>
      <div className="bg-zinc-800 p-4 rounded">
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="url" className='text-zinc-400'>Image</label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='URL of image'
              name="url"
              value={data.url}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5'>
            <label htmlFor="title" className='text-zinc-400'>Title</label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Title'
              name="title"
              value={data.title}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5'>
            <label htmlFor="agency" className='text-zinc-400'>Company</label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Company'
              name="agency"
              value={data.agency}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5'>
            <label htmlFor="price" className='text-zinc-400'>Price</label>
            <input
              type="number"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Price'
              name="price"
              value={data.price}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5'>
            <label htmlFor="description" className='text-zinc-400'>Description</label>
            <textarea
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Description'
              name="description"
              value={data.description}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5'>
            <button
              type="submit"
              className='mt-4 px-10 text-white border border-blue-100 font-semibold py-2 rounded hover:text-blue-500 transition-all duration-300'
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCloth;

