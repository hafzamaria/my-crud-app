import axios from 'axios';
import {useEffect, useState } from "react";
import './App.css';
function App() {

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const [users, setUsers] = useState([])
  const [toggleRefresh, setToggleRefresh] = useState(true)

  useEffect(() => {

    let getAllUsers = async () => {
      let response = await axios.get('http://localhost:5000/users');
      setUsers(response.data.data)
    }
    getAllUsers();

  }, [toggleRefresh])





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
      method: 'post',
      url: "http://localhost:5000/signup",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      // withCredentials: true
    })
      .then(res => {
        console.log(`upload Success` + res.data);
        setToggleRefresh(!toggleRefresh)
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <div>

      <form onSubmit={doSignup}>
      Name: <input name="name" type="text" placeholder="Name" id='name' onChange={(e)=>{setName(e.target.value)}} />
        <br />
        Email: <input name="email" type="email" placeholder="Email" id='email' onChange={(e)=>{setEmail(e.target.value)}} />
        <br />
        Password: <input name="password" type="password" placeholder="Password" id='password' onChange={(e)=>{setPassword(e.target.value)}} />
        <br />

        Profile Picture: <input type="file" id="profilePictureInput" accept='image/*'
          onChange={() => {
            ////// to display imager instantly on screen
            var profilePictureInput = document.getElementById("profilePictureInput");
            var url = URL.createObjectURL(profilePictureInput.files[0])
            console.log("url: ", url);
            document.getElementById("img").innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `
          }} />

        <div id="img"></div>

        <br />
        <button type='submit'>Signup</button>
      </form>


      <h1>Users List: </h1>

      <div className='map'>
        {users.map(eachUser => (
          <div className='key' key={eachUser.id}>
            <img  className='img'  src={eachUser.profilePicture} alt="" />
            <p className='name'>{eachUser.name}</p><br/>
            {/* <span>{eachUser.email}</span> */}
            
          </div>
        ))}
      </div>





    </div>
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
export default App;
