import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateFAQ } from "@/queries/FAQ.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//TODO: modify schema,

const FAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
  categoryId: z.string(),
});

type FAQValues = z.infer<typeof FAQSchema>;

type FAQCreateFormProps = {
  handleClose: () => void;
};

function FAQCreateForm({ handleClose }: FAQCreateFormProps) {
  const form = useForm<FAQValues>({
    resolver: zodResolver(FAQSchema),
    defaultValues: {
      question: "",
      answer: "",
      categoryId: "",
    },
  });

  const { mutate: createFAQ } = useCreateFAQ();

  const handleSubmit = (data: FAQValues) => {
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
