import axios from "axios";
import { useEffect, useState } from "react";

import "./index.css";

function Signup() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);

  useEffect(() => {
    let getAllUsers = async () => {
      let response = await axios.get("https://crud--crud-app.herokuapp.com/users");
      setUsers(response.data.data.reverse());
    };
    getAllUsers();
  }, [toggleRefresh]);

  const doSignup = async (e) => {
    e.preventDefault();

    var profilePictureInput = document.getElementById("profilePictureInput");
    console.log("fileInput: ", profilePictureInput.files); // local url

    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

    formData.append("name", Name); // this is how you add some text data along with file
    formData.append("email", Email); // this is how you add some text data along with file
    formData.append("password", Password); // this is how you add some text data along with file
    formData.append("profilePicture", profilePictureInput.files[0]); // file input is for browser only, use fs to read file in nodejs client

    axios({
      method: "post",
      // url: "http://localhost:5000/signup",
      url: "https://crud--crud-app.herokuapp.com/signup",///after backend deploy connect url instead of local host
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
      <div className="flex">
        <div className="main">
          <div className="start">
            <h1>Signup Form</h1>
            <p class="para">please fill in this form to create an account!</p>
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
            Email:{" "}
            <input
              className="in1"
              name="email"
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            Password:{" "}
            <input
              className="in1"
              name="password"
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
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
                  Signup
                </button>
                <p className="message" id="message"></p>
              </div>
            </div>
          </form>
          <p id="message"></p>
        </div>
      </div>
      <div className="result">
        <div className="map">
          {users.map((eachUser) => (
            <div className="key" key={eachUser.id}>
              <img className="img" src={eachUser.profilePicture} alt="" />
              <p className="name">{eachUser.name}</p>
              <br />
              {/* <span>{eachUser.email}</span> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// function App() {

//   ///step2 do signup fun
//   const doSignup = async (e) => {
//     e.preventDefault();

//     ////step3
//     var profilePictureInput = document.getElementById("profilePictureInput");
//     console.log("fileInput: ", profilePictureInput.files); // local url

//     ////step5 formData
//     let formData =new FormData();
//     ////formData.append('key' value)

//     formData.append("name", Name); // this is how you add some text data along with file
//     formData.append("email", Email); // this is how you add some text data along with file
//     formData.append("password", Password); // this is how you add some text data along with file
//     formData.append("profilePicture", profilePictureInput.files[0]); // file input is for browser only, use fs to read file in nodejs client

//   /////step6 axios(npm i axios)(import axios)

//   axios({
//     method:'post',
//     url:'http://localhost:5000/signup',
//     data:formData,
//     headers:{'Content-Type':'multipart/form-data'},
//     // withCredentials:true
//   })
//   .then(res=>{
//     console.log(`upload Success` + res.data);
//   })
//   .catch(err=>{
//     console.log(err);
//   })

//   }
//   return (
//     <div>
//      {/* ////step1form */}
//       <form onSubmit={doSignup}>

//         Name: <input
//         name="Name"
//         type="text"
//         placeholder="Name"
//         id='name'  />
//         <br />

//         Email: <input
//         name="Email"
//         type="email"
//         placeholder="Email"
//         id='email' />
//         <br />

//         Password: <input
//         name="Password"
//         type="password"
//         placeholder="Password"
//         id='password'  />
//         <br />

//         Profile Picture: <input
//         type="file"
//         id="profilePictureInput"
//         accept='image/*'
//         ////step4 on profile onchange
//           onChange={() => {
//             ////// to display imager instantly on screen
//             var profilePictureInput = document.getElementById("profilePictureInput");
//             var url = URL.createObjectURL(profilePictureInput.files[0])
//             console.log("url: ", url);
//             document.getElementById("img").innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `
//           }} />

//         <div id="img"></div>

//         <br />
//         <button type='submit'>Signup</button>
//       </form>
//       </div>
//   )
//         }
export default Signup;
