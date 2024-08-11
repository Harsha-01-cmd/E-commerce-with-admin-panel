import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ClothCard = ({ data }) => {
  console.log('ClothCard data:', data);
  return (
    <Link to={`/get-byid-public/${data._id}`}>
      <div className="bg-zinc-800 rounded p-4">
        <div className="bg-zinc-900">
          <img src={data.url} alt={data.title} className="w-full h-auto"/>
        </div>
        <div className="text-white mt-2">
          <h3 className="text-xl text-yellow-100">{data.title}</h3>
          <p className="text-blue-300">${data.price}</p>
        </div>
      </div>
    </Link>
  );
}
ClothCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ClothCard;


