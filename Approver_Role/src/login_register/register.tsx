import RegisterForm from "./registerForm"
import "./register.css"


const Register = () => {
    return(
        <div className="register-background">
            <div className="IconRegister"></div>
            
            <div className="formRegister"> <RegisterForm/> </div>
        </div>
    )

}


export default Register