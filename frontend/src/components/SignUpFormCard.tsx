import { SignUpInputSchema } from '@rinshadp014/blogging-site-common/dist';
import { useState } from "react";
import Button from './Button';
import UpperPart from './FormUpperPart';
import LabbledInput from './LabelledInput';

const SignUpFormCard = () => {

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
export default SignUpFormCard
