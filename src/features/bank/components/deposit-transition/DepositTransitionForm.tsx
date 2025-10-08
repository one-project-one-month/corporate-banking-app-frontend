import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  useCreateDeposit,
  useUpdateDeposit,
} from "@/queries/depositTransition.query";
import type { BaseDepositTransition } from "@/types/DepositTransition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//TODO: modify schema,

const DepositTransitionSchema = z.object({
  accountTypeId: z.number(),
  accountNumber: z.string(),
  name: z.string(),
  amount: z.number().min(0, "Amount must be a positive number"),
  note: z.string(),
});

type DepositTransitionValues = z.infer<typeof DepositTransitionSchema>;

type DepositTransitionCreateFormProps = {
  handleClose: () => void;
  editDepositTransition: BaseDepositTransition | null;
};

function DepositTransitionCreateForm({
  handleClose,
  editDepositTransition,
}: DepositTransitionCreateFormProps) {
  const form = useForm<DepositTransitionValues>({
    resolver: zodResolver(DepositTransitionSchema),
    defaultValues: {
      accountTypeId: editDepositTransition?.accountType.id ?? undefined,
      accountNumber: editDepositTransition?.accountNumber ?? "",
      name: editDepositTransition?.name ?? "",
      amount: editDepositTransition?.amount ?? 0,
      note: editDepositTransition?.note ?? "",
    },
  });

  const { mutate: createDepositTransition } = useCreateDeposit();
  const { mutate: updateExistingDepositTransition } = useUpdateDeposit();

  const handleSubmit = (data: DepositTransitionValues) => {
    if (editDepositTransition) {
      updateExistingDepositTransition({ id: editDepositTransition.id, data });
      return;
    }
    createDepositTransition({ ...data });
  };

  return (
    <div className="p-5 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col justify-between h-full"
        >
          <div>
            <h1 className="text-2xl font-bold mb-6">
              Create DepositTransition
            </h1>
            <FormTextInput
              name="accountTypeId"
              label="Account Type"
              placeholder="Enter Account Type"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="accountNumber"
              label="Account Number"
              placeholder="Enter Account Number"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="name"
              label="Name"
              placeholder="Enter Name"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="amount"
              label="Amount"
              placeholder="Enter Amount"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="note"
              label="Note"
              placeholder="Enter Note"
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

export default DepositTransitionCreateForm;
