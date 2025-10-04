import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateFaq, useUpdateExistingFaq } from "@/queries/FAQ.query";
import type { BaseFAQ } from "@/types/FAQ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//TODO: modify schema,

const FAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
  categoryId: z.number(),
});

type FAQValues = z.infer<typeof FAQSchema>;

type FAQCreateFormProps = {
  handleClose: () => void;
  editFAQ: BaseFAQ | null;
};

function FAQCreateForm({ handleClose, editFAQ }: FAQCreateFormProps) {
  const form = useForm<FAQValues>({
    resolver: zodResolver(FAQSchema),
    defaultValues: {
      question: editFAQ?.question ?? "",
      answer: editFAQ?.answer ?? "",
      categoryId: editFAQ?.category.id ?? undefined,
    },
  });

  const { mutate: createFAQ } = useCreateFaq();
  const { mutate: updateExistingFaq } = useUpdateExistingFaq();

  const handleSubmit = (data: FAQValues) => {
    if (editFAQ) {
      updateExistingFaq({ id: editFAQ.id, data });
      return;
    }
    createFAQ({ ...data });
  };

  return (
    <div className="p-5 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col justify-between h-full"
        >
          <div>
            <h1 className="text-2xl font-bold mb-6">Create FAQ</h1>
            <FormTextInput
              name="question"
              label="Question"
              placeholder="Enter FAQ question"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="answer"
              label="Answer"
              placeholder="Fill Answer"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextInput
              name="categoryId"
              label="Category"
              placeholder="Select Category"
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

export default FAQCreateForm;
