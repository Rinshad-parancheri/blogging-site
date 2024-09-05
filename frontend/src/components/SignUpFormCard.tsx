import { SignUpInputSchema } from '@rinshadp014/blogging-site-common/dist';
import { useState } from "react";
import Button from './Button';
import UpperPart from './FormUpperPart';
import LabbledInput from './LabelledInput';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUpFormCard = () => {
  const navigate = useNavigate()
  const [postInput, setPostInput] = useState<SignUpInputSchema>({
    name: "",
    password: "",
    email: ""
  })

  return (
    < div className=' h-screen flex justify-center  items-center' >
      <div className="form-conatainer w-max-[400px]">
        <UpperPart tittle="Create an account"
          description="Already have an account?"
          route="/signin"
        ></UpperPart>
        <LabbledInput label="username"
          placeHolder="rinsha014"
          onChange={
            (e) => {
              setPostInput({
                ...postInput,
                name: e.target.value
              })
            }
          }></LabbledInput>
        <LabbledInput label="email" placeHolder="rinshar99@gmail.com" onChange={
          (e) => {
            setPostInput({
              ...postInput,
              email: e.target.value
            })
          }
        }></LabbledInput>
        <LabbledInput label="password"
          placeHolder="hell91098@f"
          type="password" onChange={
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
  name: string
}

async function sendRequest(postInput: SendRequest) {
  try {

    const response = await axios.post(`http://backend.rinshadp014.workers.dev/app/v1/user/signup`, postInput)
    let data = response.data
    localStorage.setItem('token', data.token)
    localStorage.setItem('userName', data.userName)

  } catch (e) {
    console.log(e)

  }
}
export default SignUpFormCard
