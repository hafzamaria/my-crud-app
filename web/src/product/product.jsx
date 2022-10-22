import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

function Product() {
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");
  const [products, setProducts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);

  useEffect(() => {
    let getAllProducts = async () => {
      let response = await axios.get("http://localhost:5000/products");
      setProducts(response.data.data.reverse());
    };
    getAllProducts();
  }, [toggleRefresh]);

  const doSignup = async (e) => {
    e.preventDefault();

    var profilePictureInput = document.getElementById("profilePictureInput");
    console.log("fileInput: ", profilePictureInput.files); // local url

    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

    formData.append("name", Name); // this is how you add some text data along with file
    formData.append("description", description); // this is how you add some text data along with file
    formData.append("price", price); // this is how you add some text data along with file
    formData.append("code", code);
    formData.append("profilePicture", profilePictureInput.files[0]);

    // file input is for browser only, use fs to read file in nodejs client

    axios({
      method: "post",
      // url: "http://localhost:5000/product",
       url: "https://dashboard.heroku.com/apps/crud--crud-app/activity/product",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      // withCredentials: true
    })
      .then((res) => {
        console.log(`upload Success` + res.data);
        document.querySelector("#message").innerHTML = res.data.message;
        setToggleRefresh(!toggleRefresh);
      })
      .catch((err) => {
        console.log(err);
        document.querySelector("#message").innerHTML = err.res.data.message;
      });
  };

  return (
    <>
      <div className="flex1">
        <div className="main">
          <div className="start">
            <h1>Product Form</h1>
          </div>

          <form onSubmit={doSignup}>
            <div className="in1">
              Name:{" "}
              <input
                name="name"
                type="text"
                placeholder="Name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <br />
            Description:{" "}
            <input
              name="description"
              type="text"
              placeholder="Description"
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <br />
            Price:{" "}
            <input
              className="in1"
              name="price"
              type="number"
              placeholder="Price"
              id="price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <br />
            Code:{" "}
            <input
              className="in1"
              name="code"
              type="number"
              placeholder="Code"
              id="code"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <br />
            Profile Picture:{" "}
            <input
              className="profile"
              type="file"
              id="profilePictureInput"
              accept="image/*"
              onChange={() => {
                ////// to display imager instantly on screen
                var profilePictureInput = document.getElementById(
                  "profilePictureInput"
                );
                var url = URL.createObjectURL(profilePictureInput.files[0]);
                console.log("url: ", url);
                document.getElementById(
                  "img"
                ).innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `;
              }}
            />
            <div className="sign">
              <div id="img"></div>

              <div className="msg">
                <button className="but" type="submit">
                  Submit
                </button>
                <p className="message" id="message"></p>
              </div>
            </div>
          </form>
          <p id="message"></p>
        </div>
      </div>
      <div className="result">
        <div className="map1">
          {products.map((eachProduct) => (
            <div className="key1" key={eachProduct._id}>
              <div className="img1">
                {" "}
                <img className="pic" src={eachProduct.profilePicture} alt="" />
              </div>
              <div className="detail">
                <p className="name1">{eachProduct.name}</p>
                <br />
                <div>{eachProduct.description}</div>
                <br />
                <div className="price">{eachProduct.Price}</div>
                <br />
                <div>{eachProduct.code}</div>
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
