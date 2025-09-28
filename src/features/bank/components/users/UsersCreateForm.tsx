import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { email } from "zod";
import { Form } from "@/components/ui/form";
import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/queries/userQuery";

const UserSchema = z.object({
  fullName: z.string(),
  dateOfBirth: z.string(),
  genderId: z.string(),
  email: z.email(),
});

type UsersCreateFormProps = {
  handleClose: () => void;
};

type UserFormValues = z.infer<typeof UserSchema>;

function UsersCreateForm({ handleClose }: UsersCreateFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
  });

  const { mutate: createUser } = useCreateUser();

  const handleSubmint = (data: UserFormValues) => {
    createUser({
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      genderId: data.genderId,
      email: data.email,
    });
  };

  return (
    <div className="p-5 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmint)}
          className="flex flex-col justify-between h-full"
        >
          <div>
            <h1 className="text-2xl font-bold mb-6">Create User</h1>
            <FormTextInput
              name="fullName"
              label="Full Name"
              placeholder="Enter your fullname"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="dateOfBirth"
              label="DOB"
              placeholder="Enter your date of birth"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="genderId"
              label="Gender"
              placeholder="Choose your gender"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="email"
              label="Email"
              placeholder="Enter your Email"
              form={form}
              wrapperClass="mb-4"
            />
          </div>
          <div>
            <Button type="submit" className="block w-full mb-4  text-white">
              Create
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              className="block w-full bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UsersCreateForm;
