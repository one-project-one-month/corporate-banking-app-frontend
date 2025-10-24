import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  useCreateAccount,
  useUpdateExistingAccount,
} from "@/queries/Account.query";
import type { BaseAccount } from "@/types/Account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//TODO: modify schema,

const AccountSchema = z.object({
  accountNumber: z.number().min(1, "Account number is required"),
  accountHolder: z.string().nonempty("Account Holder is required"),
  accountType: z.string().nonempty("Account type is required"),
  status: z.boolean(),
  createBy: z.string().nonempty(),
});

type AccountsValues = z.infer<typeof AccountSchema>;

type AccountsCreateFormProps = {
  handleClose: () => void;
  editAccount: BaseAccount | null;
};

function AccountCreateForm({
  handleClose,
  editAccount,
}: AccountsCreateFormProps) {
  const form = useForm<AccountsValues>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      accountNumber: editAccount ? editAccount.accountNumber : 0,
      accountHolder: editAccount ? editAccount.accountHolder : "",
      accountType: editAccount ? editAccount.accountType : "",
      status: editAccount ? editAccount.status : false,
      createBy: editAccount ? String(editAccount.createdBy) : "",
    },
  });

  const { mutate: createOrganization } = useCreateAccount();
  const { mutate: updateExistingOrganization } = useUpdateExistingAccount();

  const handleSubmit = (data: AccountsValues) => {
    if (editAccount) {
      updateExistingOrganization({ id: editAccount.id, data });
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
              name="accountNumber"
              label="Account Number"
              placeholder="Enter Account Number"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="accountHolder"
              label="Account Holder"
              placeholder="Enter Account Holder"
              form={form}
              wrapperClass="mb-4"
            />

            <FormTextInput
              name="accountType"
              label="Account Type"
              placeholder="Enter Account Type"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="status"
              label="Status"
              placeholder="Enter address"
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

export default AccountCreateForm;
