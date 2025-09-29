import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import { useBankAdminLogin } from "@/queries/auth.query";

const loginSchema = z.object({
  username: z.string().nonempty(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: login } = useBankAdminLogin();

  const onSubmit = (data: LoginFormValues) => {
    login({ ...data });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto max-w-[25%]"
      >
        <FormTextInput form={form} name="username" label="Username" required />
        <FormTextInput
          form={form}
          name="password"
          label="Password"
          type="password"
          required
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
