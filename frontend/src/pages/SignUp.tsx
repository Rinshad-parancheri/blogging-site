import SignUpFormCard from "../components/SignUpFormCard"
import Quote from "../components/Quote"

export const SignUp = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div><SignUpFormCard ></SignUpFormCard></div>
      <div className="invisible lg:visible">
        <Quote></Quote>
      </div>
    </div>
  )
}
