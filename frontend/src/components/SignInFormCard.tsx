import { useState } from "react";
import { Link } from "react-router-dom";
import Button from './Button';
import LabbledInput from './LabelledInput';
import { SignInInputSchema } from "@rinshadp014/blogging-site-common";
import UpperPart from "./FormUpperPart";



const SignInFormCard = () => {


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
                email: e.target.value
              })
            }
          }></LabbledInput>
        <Button
          content={'signin'}
          onClick={(e) => {
            e.preventDefault()

          }}>

        </Button>
      </div>

    </div >
  )
}
export default SignInFormCard
