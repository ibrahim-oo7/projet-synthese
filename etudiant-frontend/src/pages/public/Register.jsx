import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSucces } from "../../features/auth/authSlice";
import axios from "axios";
import { 
  FaEnvelope, FaLock, FaUser, 
  FaEye, FaEyeSlash,
  FaGoogle, FaFacebook, FaLinkedin, FaApple
} from "react-icons/fa";

export default function Register(){

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if(errors[name]){
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = ()=>{
    const newErrors = {};

    if(!formData.username.trim()){
      newErrors.username = "Username is required";
    }

    if(!formData.email.trim()){
      newErrors.email = "Email is required";
    } else if(!/\S+@\S+\.\S+/.test(formData.email)){
      newErrors.email = "Invalid email";
    }

    if(!formData.password){
      newErrors.password = "Password is required";
    } else if(formData.password.length < 6){
      newErrors.password = "Min 6 characters";
    }

    if(formData.confirmPassword !== formData.password){
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

  try {
    const payload = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
    };

    const res = await axios.post(
      "http://127.0.0.1:8000/api/register",
      payload
    );
    navigate("/student/dashboard")
    console.log(res.data);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  return(
    <div style={styles.container}>
      
      <div style={styles.overlay}></div>

      <div style={styles.formWrapper}>

        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>
          Join FormInnova and start learning today
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* USERNAME */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <FaUser style={styles.inputIcon}/>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            {errors.username && <p style={styles.errorText}>{errors.username}</p>}
          </div>

          {/* EMAIL */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <FaEnvelope style={styles.inputIcon}/>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.inputIcon}/>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
              </button>
            </div>
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.inputIcon}/>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            {errors.confirmPassword && (
              <p style={styles.errorText}>{errors.confirmPassword}</p>
            )}
          </div>

          {/* BUTTON */}
          <button type="submit" style={styles.registerButton}>
            Sign Up
          </button>

          {/* SOCIAL */}
          <div style={styles.socialContainer}>
            <p style={styles.orText}>Or continue with</p>

            <div style={styles.socialButtons}>
              <button style={{...styles.socialButton, ...styles.google}}>
                <FaGoogle/>
              </button>

              <button style={{...styles.socialButton, ...styles.facebook}}>
                <FaFacebook/>
              </button>

              <button style={{...styles.socialButton, ...styles.linkedin}}>
                <FaLinkedin/>
              </button>

              <button style={{...styles.socialButton, ...styles.apple}}>
                <FaApple/>
              </button>
            </div>
          </div>

          {/* LOGIN LINK */}
          <p style={styles.loginText}>
            Already have an account? 
            <Link to="/login" style={styles.loginLink}> Login</Link>
          </p>

        </form>
      </div>
    </div>
  )
}
const styles = {

/* ===== CONTAINER ===== */
container:{
height:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center",
position:"relative",
backgroundImage:"url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
backgroundSize:"cover",
backgroundPosition:"center",
fontFamily:"Segoe UI, sans-serif"
},

overlay:{
position:"absolute",
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.6)",
backdropFilter:"blur(6px)",
zIndex:1
},

/* ===== FORM ===== */
formWrapper:{
position:"relative",
zIndex:10,
width:"380px",
padding:"40px",
borderRadius:"20px",
background:"rgba(255,255,255,0.08)",
backdropFilter:"blur(20px)",
border:"1px solid rgba(255,255,255,0.2)",
boxShadow:"0 0 30px rgba(21,190,106,0.6)",
color:"#fff"
},

title:{
fontSize:"28px",
fontWeight:"bold",
marginBottom:"10px"
},

subtitle:{
fontSize:"14px",
color:"#ccc",
marginBottom:"20px"
},

form:{
display:"flex",
flexDirection:"column",
gap:"15px"
},

inputGroup:{
display:"flex",
flexDirection:"column"
},

label:{
fontSize:"16px",
fontWeight:"600",
color:"#15BE6A",
padding:"5px"
},

inputWrapper:{
display:"flex",
alignItems:"center",
background:"#f9fafb",
borderRadius:"12px",
padding:"12px 16px",
border:"1px solid #e5e7eb"
},

input:{
flex:1,
border:"none",
outline:"none",
background:"transparent",
color:"#111827",
fontSize:"14px"
},

inputIcon:{
marginRight:"12px",
color:"#15BE6A"
},

eyeButton:{
background:"none",
border:"none",
color:"#15BE6A",
cursor:"pointer"
},

errorText:{
color:"#ff6b6b",
fontSize:"12px"
},

/* ===== BUTTON ===== */
registerButton:{
marginTop:"10px",
padding:"12px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(135deg,#15BE6A,#0f9f5c)",
color:"#fff",
fontWeight:"bold",
cursor:"pointer",
boxShadow:"0 0 15px rgba(21,190,106,0.7)"
},

/* ===== SOCIAL ===== */
socialContainer:{
textAlign:"center",
marginTop:"15px"
},

orText:{
fontSize:"13px",
color:"#aaa",
marginBottom:"10px"
},

socialButtons:{
display:"flex",
justifyContent:"center",
gap:"10px"
},

socialButton:{
width:"40px",
height:"40px",
borderRadius:"50%",
background:"rgba(255,255,255,0.1)",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
},

socialIcon:{
fontSize:"16px"
},

loginText:{
marginTop:"15px",
fontSize:"13px",
textAlign:"center",
color:"#ccc"
},

loginLink:{
color:"#15BE6A",
fontWeight:"bold",
textDecoration:"none"
}

};