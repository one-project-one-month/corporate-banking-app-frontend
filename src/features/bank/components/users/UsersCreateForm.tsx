import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form } from "@/components/ui/form";
import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import FormSelectInput from "@/components/common/form-inputs/FormSelectInput";
import FormDateInput from "@/components/common/form-inputs/FormDateInput";
import { formatDateToYYYYMMDD } from "@/lib/helpers/dateFormat";
import type { BaseUser } from "@/types/User";
import { useCreateUser, useUpdateExistingUser } from "@/queries/user.query";

//TODO: modify schema, need to add more form input variant (//dropdown select input type)

const UserSchema = z.object({
  fullName: z.string().nonempty(),
  dateOfBirth: z.date(),
  genderId: z.string().nonempty(),
  email: z.email().nonempty(),
});

type UsersCreateFormProps = {
  editUser?: BaseUser | null;
  handleClose: () => void;
};

type UserFormValues = z.infer<typeof UserSchema>;

function UsersCreateForm({ handleClose, editUser }: UsersCreateFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullName: editUser?.fullName || "",
      dateOfBirth: editUser?.dateOfBirth
        ? new Date(editUser.dateOfBirth)
        : new Date(),
      genderId: editUser?.genderId ? String(editUser.genderId) : "",
      email: editUser?.email || "",
    },
  });

  const { mutate: createUser } = useCreateUser();
  const { mutate: updateExistingUser } = useUpdateExistingUser();

  const handleSubmint = (data: UserFormValues) => {
    const payload = {
      fullName: data.fullName,
      dateOfBirth: formatDateToYYYYMMDD(data.dateOfBirth),
      genderId: Number(data.genderId),
      email: data.email,
    };

    if (editUser) {
      updateExistingUser({ id: editUser.id, data: payload });
      return;
    }

    createUser(payload);
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
            <FormDateInput
              name="dateOfBirth"
              label="DOB"
              placeholder="Enter your date of birth"
              form={form}
              wrapperClass="mb-4"
            />
            <FormSelectInput
              name="genderId"
              label="Gender"
              placeholder="Choose your gender"
              form={form}
              options={[
                {
                  label: "Male",
                  value: "1",
                },
                {
                  label: "Female",
                  value: "2",
                },
              ]}
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
            <Button
              type="button"
              onClick={handleClose}
              className="block w-full bg-gray-300 mb-4 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit" className="block w-full  text-white">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UsersCreateForm;
