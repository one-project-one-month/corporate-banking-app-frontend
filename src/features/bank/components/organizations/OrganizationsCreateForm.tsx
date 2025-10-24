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
  organizationId: z.number(),
  organizationName: z.string(),
  organizationAdmin: z.string(),
  adminEmail: z.string(),
  status: z.boolean(),
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
      organizationId: editOrganization ? editOrganization.organizationId : 0,
      organizationName: editOrganization
        ? editOrganization.organizationName
        : "",
      organizationAdmin: editOrganization
        ? editOrganization.organizationAdmin
        : "",
      adminEmail: editOrganization ? editOrganization.adminEmail : "",
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
              name="organizationId"
              label="Organization Id"
              placeholder="Enter organization name"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="organizationName"
              label="Organization Name"
              placeholder="Enter organization name"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="organizationAdmin"
              label="Organization Admin"
              placeholder="select"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="adminEmail"
              label="Admin Email"
              placeholder="select"
              form={form}
              wrapperClass="mb-4"
            />

            <FormTextInput
              name="status"
              label="Status"
              placeholder="Enter Status"
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
