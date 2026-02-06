import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type SignUpCredentials,
  signUpSchema,
} from "../../utils/validation/auth";

function SignUp() {
  const form = useForm<SignUpCredentials>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: SignUpCredentials) {
    console.log(data);
  }

  return (
    <div>
      <div>
        <h1>objects</h1>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <header>
            <h2>some content</h2>
            <p>some more content</p>
          </header>

          <div>
            <input
              type="text"
              placeholder="name"
              {...form.register("fullname")}
            />
            <input
              type="email"
              placeholder="email"
              {...form.register("email")}
            />
            <input
              type="password"
              placeholder="password"
              {...form.register("password")}
            />
            <button type="submit">start exploring</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
