import React,{useEffect,useState} from 'react'
import *as Realm from 'realm-web'
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
const app= new Realm.App({id:process.env.REACT_APP_REALM_ID})
const user = app.currentUser
const schema = {
    title: 'Register',
    type: 'object',
    required: [ 'email', 'password'],
    properties: {
   
      email: { type: 'string', title: 'Email', format: 'email' },
      password: { type: 'string', title: 'Password', minLength: 6 ,format:'password'},
    },
  };
  
const Login = {
    title: 'Login',
    type: 'object',
    required: [ 'email', 'password'],
    properties: {
   
      email: { type: 'string', title: 'Email', format: 'email' },
      password: { type: 'string', title: 'Password', minLength: 6 ,format:'password'},
    },
  };

const Home = () => {
  const [Sum,SetSum]= useState({});
  const [total,setTotal]= useState()
  useEffect(()=>{
  fetchData()
  },[])
  const fetchData = async()=>{
    const funtionName="module"
    try {
      const res= await user.callFunction(funtionName)
      SetSum(res[0]?.public?.input?.jsonSchema)
    
   
    } catch (error) {
      console.log(error.error)
    }
  }
    const Register = async (form)=>{
        const {email,password}= form?.formData
       try {
        await app.emailPasswordAuth.registerUser({ email, password });
        console.log("Đăng ký thành công")
        window.location.reload(true)
       } catch (error) {
        console.log(error.error)
       }    
    }
    const Loginn = async (form)=>{
        const {email,password}= form?.formData
       try {
        const credentials = Realm.Credentials.emailPassword(email, password);
        // Authenticate the user
         await app.logIn(credentials);
        console.log("Đăng nhập thành công:")
        window.location.reload(true)
       } catch (error) {
        console.log(error.error)
       }
    }
    const logOut = async ()=>{
   
       try {
        await user.logOut();
        console.log("Đăng xuất thành công:")
        window.location.reload(true)
       } catch (error) {
        console.log(error.error)
       }
    }

const OnSum = async(form)=>{
  const funtionName="SUMAB"
  const args=[form?.formData,user.id]
  try {
    const res= await user.callFunction(funtionName, ...args)
    console.log(res)
    setTotal(res[0]?.public?.output?.total)
    console.log(res[0]?.public?.output?.total)
  } catch (error) {
    console.log(error.error)
  }
}
    
  return (
    <div>
        {user?(
            <div>home
                <button onClick={logOut}>Đăng xuất</button>
                <Form
            schema={Sum}
            validator={validator}
           
            onSubmit={OnSum}
        
          />
         <p>kết quả là:{total}</p>
     
         </div>
        ):(
            <>
            <Form
            schema={schema}
            validator={validator}
           
            onSubmit={Register}
        
          />
               <Form
            schema={Login}
            validator={validator}
           
            onSubmit={Loginn}
        
          /></>
        )}
      
    </div>
  )
}

export default Home