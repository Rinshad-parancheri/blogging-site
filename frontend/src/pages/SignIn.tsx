import Quote from "../components/Quote"
import SignInFormCard from "../components/SignInFormCard"

export const SignIn = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div><SignInFormCard></SignInFormCard></div>
      <div className="invisible lg:visible">
        <Quote></Quote>

      </div>
    </div>
  )
}
