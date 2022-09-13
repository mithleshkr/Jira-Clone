import React, { useState } from "react";
import "antd/dist/antd.css";
import "./Style.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button,  Form, Input } from "antd";
import { auth,db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = () => {
    auth.createUserWithEmailAndPassword(email, password).then(
      (result) => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
        swal({
          title: "GREAT",
          text: "Successfully registered",
          icon: "success",
          timer: "1500",
          button: false,
        });
      },
      (error) => {
        swal({
          title: "Oops!",
          text: error.message,
          icon: "error",
          timer: "1500",
          button: false,
        });

       
      }
    );
    
    db.collection("registration-details").add({
      Name: name,
      Email: email,
      Password: password,
    });
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return ( <div className="main-div">
  <card className="card">
  <Form
    name="normal_login"
    className="login-form"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
  >
    <Form.Item
      name="name"
      rules={[
        {
          required: true,
          message: "Please input your Name!",
        },
      ]}
    >
      <Input
        autoComplete="off"
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Form.Item>
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: "Please input your Email!",
        },
      ]}
    >
      <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: "Please input your Password!",
        },
      ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Item>
    

    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        onClick={handleSignup}

      >
        Sign up
      </Button>
      Or <a  onClick={()=>navigate("/")}>login now</a>
    </Form.Item>
  </Form>
  </card>
</div>);
};

export default Signup;

// import React,{useState} from 'react'
// import "./Style.css";
// import { Button, TextField } from "@material-ui/core";
// import { auth,db } from '../../firebase';
// import { useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';

// const Signup = () => {

//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const handleSignup = () =>{
//     auth.createUserWithEmailAndPassword(email,password).then((result)=>{
//       setTimeout(()=>{
//         navigate('/')
//       },2000)
//       swal({
//         title: "GREAT",
//         text: "Successfully registered",
//         icon: "success",
//         timer: "1500",
//         button: false
//       });

//     },(error)=>{

//       swal({
//         title: "Oops!",
//         text: error.message,
//         icon: "error",
//         timer: "1500",
//         button: false
//       });

//     })
//     db.collection("registration-details").add(
//       {
//         Name: name,
//         Email: email,
//         Password:password
//       }
//     )
//   }

//   return (
//     <div className="main-div">
//       <div className="login-title">
//         <h2>Task Management</h2>
//       </div>
//       <div>
//         <card className="card">
//           <div className="card-title">
//             <h4>Sign up to your account</h4>
//             <br/>
//             <div className="input-div">
//             <TextField
//                 type="text"
//                 label="Name"
//                 placeholder="Enter Your Name"
//                 variant="outlined"
//                 fullwidth
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <br />
//               <TextField
//                 type="email"
//                 label="Email"
//                 placeholder="Enter Your Email"
//                 variant="outlined"
//                 fullwidth
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <br />
//               <TextField
//                 type="password"
//                 label="Password"
//                 placeholder="Enter Your Password"
//                 variant="outlined"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <br />
//               <div className="login-button">
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   onClick={handleSignup}
//                   disabled={!name || !email || !password}
//                 >
//                   Sign up
//                 </Button>
//               </div>

//               <br/>

//             </div>
//           </div>
//         </card>
//       </div>
//     </div>
//   )
// }

// export default Signup;
