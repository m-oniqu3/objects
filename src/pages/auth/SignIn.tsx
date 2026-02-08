import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/auth/useAuth";
import { signIn } from "../../services/auth";
import {
  signInSchema,
  type SignInCredentials,
} from "../../utils/validation/auth";

function SignIn() {
  const { isLoading } = useAuth();
  console.log(isLoading);

  const form = useForm<SignInCredentials>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const errors = form.formState.errors;

  async function handleSubmit(values: SignInCredentials) {
    try {
      console.log(values);

      const { error } = await signIn(values);

      if (error) throw error;
    } catch (error: unknown) {
      console.log(error);
      form.setError("root", { message: error as unknown as string });
    }
  }

  return (
    <div>
      <h1>objects</h1>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <header>
          <h2>some content</h2>
          <p>some more content</p>
        </header>

        {errors.root && <p className="input-error">{errors.root.message}</p>}

        <div>
          <div>
            <input
              type="email"
              placeholder="email"
              {...form.register("email")}
            />
            {errors.email && (
              <p className="input-error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="password"
              {...form.register("password")}
            />
            {errors.password && (
              <p className="input-error">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="cursor-pointer">
            log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
