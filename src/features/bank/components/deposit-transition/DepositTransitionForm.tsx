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
import FormSelectInput from "@/components/common/form-inputs/FormSelectInput";

//TODO: modify schema,

const DepositTransitionSchema = z.object({
  transactionId: z.number(),
  accountId: z.number(),
  amount: z.number().min(0, "Amount must be a positive number"),
  transactionType: z.enum([
    "payroll",
    "annual salary payment",
    "merchant payment",
  ]),
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
      transactionId: editDepositTransition?.transactionId,
      accountId: editDepositTransition?.accountId,
      amount: editDepositTransition?.amount ?? 0,
      transactionType: editDepositTransition?.transactionType as
        | "payroll"
        | "annual salary payment"
        | "merchant payment",
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
              name="transactionId"
              label="Transaction Id"
              placeholder="Enter Id"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="accountId"
              label="Account Id"
              placeholder="Enter Account Number"
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
            <FormSelectInput
              name="transactionType"
              label="Transaction Type"
              placeholder="Select transaction type"
              form={form}
              wrapperClass="mb-4"
              options={[
                { label: "Payroll", value: "payroll" },
                {
                  label: "Annual Salary Payment",
                  value: "annual salary payment",
                },
                { label: "Merchant Payment", value: "merchant payment" },
              ]}
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
