import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormTextArea from "@/components/common/form-inputs/FormTextArea";
import FormDateInput from "@/components/common/form-inputs/FormDateInput";
import {
  useCreateOrganization,
  useUpdateExistingOrganization,
} from "@/queries/organization.query";
import type { BaseOrganization } from "@/types/Organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//TODO: modify schema,

const OrganizationsSchema = z.object({
  name: z.string().nonempty(),
  selectOrganizationType: z.string().nonempty(),
  selectDate: z.string().nonempty(),
  address: z.string().nonempty(),
  fullName: z.string().nonempty(),
  registerEmail: z.string().nonempty(),
  phoneNumber: z.string().nonempty(),
  userName: z.string().nonempty(),
});

type OrganizationsValues = z.infer<typeof OrganizationsSchema>;

type OrganizationsCreateFormProps = {
  handleClose: () => void;
  editOrganization: BaseOrganization | null;
};

function OrganizationsCreateForm({
  handleClose,
  editOrganization,
}: OrganizationsCreateFormProps) {
  const form = useForm<OrganizationsValues>({
    resolver: zodResolver(OrganizationsSchema),
    defaultValues: {
      name: editOrganization ? editOrganization.name : "",
      selectOrganizationType: editOrganization
        ? editOrganization.selectOrganizationType
        : "",
      selectDate: editOrganization ? editOrganization.selectDtate : "",
      address: editOrganization ? editOrganization.address : "",
      fullName: editOrganization ? editOrganization.fullName : "",
      registerEmail: editOrganization ? editOrganization.registerEmail : "",
      phoneNumber: editOrganization ? editOrganization.phoneNumber : "",
      userName: editOrganization ? editOrganization.userName : "",
    },
  });

  const { mutate: createOrganization } = useCreateOrganization();
  const { mutate: updateExistingOrganization } =
    useUpdateExistingOrganization();

  const handleSubmit = (data: OrganizationsValues) => {
    if (editOrganization) {
      updateExistingOrganization({ id: editOrganization.id, data });
      return;
    }

    createOrganization({ ...data });
  };

  return (
    <div className="p-5 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col justify-between h-full"
        >
          <div>
            <h1 className="text-2xl font-bold mb-6">Create Organization</h1>
            <FormTextInput
              name="name"
              label="Organization Name"
              placeholder="Enter organization name"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="selectOrganizationType"
              label="Organization Type"
              placeholder="select"
              form={form}
              wrapperClass="mb-4"
            />
            <FormDateInput
              name="selectDate"
              label="Organization Registered Date"
              placeholder="select"
              form={form}
              wrapperClass="mb-4"
            />

            <FormTextArea
              name="address"
              label="Address"
              placeholder="Enter address"
              form={form}
              wrapperClass="mb-4"
            />

            <FormTextInput
              name="fullName"
              label="Org Admin's Full Name"
              placeholder="Enter full name"
              form={form}
              wrapperClass="mb-4"
            />

            <FormTextInput
              name="registerEmail"
              label="Org Admin's Registered Email"
              placeholder="Enter email"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="phoneNumber"
              label="Org Admin's Registered Phone Number"
              placeholder="Enter phone number"
              form={form}
              wrapperClass="mb-4"
            />

            <FormTextInput
              name="userName"
              label="UserName"
              placeholder="Enter user name"
              form={form}
              wrapperClass="mb-4"
            />
          </div>
          <div>
            <Button
              type="button"
              onClick={handleClose}
              className="block w-full mb-4  bg-gray-300 hover:bg-gray-400 rounded-sm"
            >
              Cancel
            </Button>
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="block w-full  text-white"
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default OrganizationsCreateForm;
