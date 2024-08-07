import { signupAction } from "@/actions/signup.action";

const SignUpPage = () => {
    return ( 
        <div>
            <h1>Create an account</h1>
			<form action={signupAction}>
				<label htmlFor="email">Email</label>
				<input name="email" id="email" />
				<br />
				<button>Continue</button>
			</form>
        </div>
     );
}
 
export default SignUpPage;