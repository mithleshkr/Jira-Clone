import React, { useState } from "react";
import "antd/dist/antd.css";
import "./Style.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { auth } from "../../firebase";
 import { useNavigate } from "react-router-dom";
 import swal from "sweetalert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).then(
      (result) =>
      
        navigate("/dashboard") + sessionStorage.setItem("email", email),
      (error) => {
        message.error(error.message)
        // swal({
        //   title: "Oops!",
        //   text: error.message,
        //   icon: "error",
        //   timer: "1500",
        //   button: false,
        // });
      }
    );
  };

  const triggerResetEmail = async () => {
    await auth.sendPasswordResetEmail( email).then((result)=>{
      message.success("Reset Mail sent Sucessfully")
    
      // swal({
      //   title: "GREAT",
      //   text: "Reset Mail sent Sucessfully",
      //   icon: "success",
      //   timer: "1500",
      //   button: false,
      // })
    
  }
    
      ,(error)=>{
        message.error(error.message)
      //   swal({
      //   title: "Oops!",
      //   text: error.message,
      //   icon: "error",
      //   timer: "1500",
      //   button: false,
      // });
    }
    );
    console.log("Password reset email sent")
  }

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="main-div">
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            autoComplete="off"
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" onClick={triggerResetEmail}>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleLogin}

          >
            Log in
          </Button>
          <div></div>
          Or <a onClick={()=>navigate("/registration")} style={{fontWeight:"600"}}>Register now!</a>
        </Form.Item>
      </Form>
      </card>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Button, TextField } from "@material-ui/core";
// import { auth } from "../../firebase";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";
// import "./Style.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     auth.signInWithEmailAndPassword(email, password).then(
//       (result) => navigate("/dashboard")+sessionStorage.setItem("email",email),
//       (error) => {
//         swal({
//           title: "Oops!",
//           text: error.message,
//           icon: "error",
//           timer: "1500",
//           button: false
//         });
//       }
//     );
//   };

//   const googleLogin = () =>{

//   }

//   return (
//     <div className="main-div">
//       <div className="login-title">
//       <img
//          width="100px"
//          height='100px'
//          src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png"
//          alt="" /><h2>iTaskManagement</h2>
//       </div>
//       <div>
//         <card className="card">
//           <div className="card-title">
//             <h4>Log in to your account</h4>
//             <div className="input-div">
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
//                   onClick={handleLogin}
//                   disabled={!email || !password}
//                 >
//                   Log in
//                 </Button>
//               </div>
//               <div className="other-signin">
//                 <p>OR</p>

//                 <Button
//                 onClick={googleLogin}

//                 className="g-button">
//                   Sign in with {" "}
//                   <img
//                     height="18px"
//                     width="18px"
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1PJmT_THldF0n5APcmt9p10utgu6KSw4cH2fQ5Xhpw&s"
//                     alt="GoogleIcon"
//                   />
//                  {" "} oogle{" "}
//                 </Button>
//               </div>
//               <br/>
//               <div className="signup-div">
//                 <p onClick={()=>navigate("/registration")}>Sign up for an account</p>
//               </div>
//             </div>
//           </div>
//         </card>
//       </div>
//     </div>
//   );
// };

// export default Login;
