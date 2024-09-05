import { useState } from "react";
import Button from './Button';
import LabbledInput from './LabelledInput';
import { SignInInputSchema } from "@rinshadp014/blogging-site-common";
import UpperPart from "./FormUpperPart";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


const SignInFormCard = () => {
  const navigate = useNavigate()

  const [postInput, setPostInput] = useState<SignInInputSchema>({
    password: "",
    email: "",
  })

  return (
    < div className=' h-screen flex justify-center  items-center' >
      <div className="form-conatainer ">
        <UpperPart tittle="Sign in to your account"
          description="Don't have an account?"
          route="/signup"
        ></UpperPart>
        <LabbledInput label="email"
          placeHolder="rinshar99@gmail.com"
          onChange={
            (e) => {
              setPostInput({
                ...postInput,
                email: e.target.value
              })
            }
          }></LabbledInput>
        <LabbledInput label="password"
          placeHolder="hell91098@f"
          type="password"
          onChange={
            (e) => {
              setPostInput({
                ...postInput,
                password: e.target.value
              })
            }
          }></LabbledInput>
        <Button
          content={'signin'}
          onClick={async (e) => {
            e.preventDefault()
            await sendRequest(postInput)
            navigate('/blogs')
          }}>

        </Button>
      </div>

    </div >
  )
}

type SendRequest = {
  email: string;
  password: string;
}

async function sendRequest(postInput: SendRequest) {
  try {
    console.log(postInput)
    const response = await axios.post(`http://backend.rinshadp014.workers.dev/app/v1/user/signin`, postInput)

    let data = response.data
    localStorage.setItem('token', data.token)
    localStorage.setItem('userName', data.userName)
    console.log(localStorage.getItem('token'))
  } catch (e) {
    console.log(e)

  }
}
export default SignInFormCard
