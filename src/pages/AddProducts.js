import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [piece, setPiece] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");
  const [listingType, setListingType] = useState("others");
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();

   
    axios.post(`https://66ebbc1e2b6cf2b89c5b759e.mockapi.io/dharma`, {
      name,
      price,
      piece,
      image,
      listingType,
    });

    setName("");
    setPiece("");
    setPrice("");
    setImage("");
    setImageData("");
    setListingType("others");
    router.push('/Products')
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setImage(file.name);
    }
  };

  return (
    <div className="container w-50 m-auto vh-100 d-flex flex-column justify-content-center">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="mt-3 mb-4">Add New Products</h2>
        <h2>
          <Link className="btn btn-success" href="Products">
            Products
          </Link>
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {imageData && (
          <img
            src={imageData}
            alt="Selected"
            className="img-fluid mb-3"
            style={{ maxWidth: "200px" }}
          />
        )}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="piece" className="form-label">
            Kilo Grams
          </label>
          <input
            type="text"
            className="form-control"
            id="piece"
            value={piece}
            onChange={(e) => setPiece(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categories
          </label>
          <select
            className="form-control"
            id="category"
            value={listingType}
            onChange={(e) => setListingType(e.target.value)}
            required
          >
            <option value="apple">Apple</option>
            <option value="banana">Banana </option>
            <option value="grapes">Grapes</option>
            <option value="litchi">Litchi </option>
            <option value="plums">Plums</option>
            <option value="gua">Gua</option>
            <option value="others">Others</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

