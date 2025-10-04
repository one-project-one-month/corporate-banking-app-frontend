import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
  shortCode: z.string().nonempty(),
  address: z.string().nonempty(),
  country: z.string().nonempty(),
  createBy: z.string().nonempty(),
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
      shortCode: editOrganization ? editOrganization.shortcode : "",
      address: editOrganization ? editOrganization.address : "",
      country: editOrganization ? editOrganization.country : "",
      createBy: editOrganization ? String(editOrganization.createdBy) : "",
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
              name="shortCode"
              label="Short Code"
              placeholder="Enter short code"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="address"
              label="Address"
              placeholder="Enter address"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="country"
              label="Country"
              placeholder="Enter country"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="createBy"
              label="Create By"
              placeholder="Create by"
              form={form}
              wrapperClass="mb-4"
            />
          </div>
          <div>
            <Button
              type="button"
              onClick={handleClose}
              className="block w-full mb-4  bg-gray-300 hover:bg-gray-400"
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
