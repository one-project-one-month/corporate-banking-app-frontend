import FormTextArea from "@/components/common/form-inputs/FormTextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateFaq, useUpdateExistingFaq } from "@/queries/FAQ.query";
import type { BaseFAQ } from "@/types/FAQ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import z from "zod";
import FormTextInput from "@/components/common/form-inputs/FormTextInput";
import { useEffect } from "react";

//TODO: modify schema,

const FAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
  faqCategoryId: z.coerce.number().min(1),
});

type FAQValues = z.infer<typeof FAQSchema>;

type FAQCreateFormProps = {
  handleClose: () => void;
  editFAQ: BaseFAQ | null;
  clearEditFaq: () => void;
};

function FAQCreateForm({
  handleClose,
  editFAQ,
  clearEditFaq,
}: FAQCreateFormProps) {
  const isEditting = !!editFAQ;
  const form = useForm<FAQValues>({
    resolver: zodResolver(FAQSchema) as Resolver<FAQValues>,
    defaultValues: {
      faqCategoryId: editFAQ?.faqCategoryId ?? 0,
      question: editFAQ?.question ?? "",
      answer: editFAQ?.answer ?? "",
    },
  });

  const { mutate: createFAQ } = useCreateFaq();
  const { mutate: updateExistingFaq } = useUpdateExistingFaq();
  const { reset } = form;

  useEffect(() => {
    if (editFAQ) {
      form.reset({
        faqCategoryId: editFAQ.faqCategoryId,
        question: editFAQ.question,
        answer: editFAQ.answer,
      });
    } else {
      form.reset({
        faqCategoryId: 0,
        question: "",
        answer: "",
      });
    }
  }, [editFAQ]);

  const handleFormClose = () => {
    handleClose();
    clearEditFaq();
    form.reset({
      faqCategoryId: 0,
      question: "",
      answer: "",
    });
  };

  const handleSubmit = (data: FAQValues) => {
    if (isEditting && editFAQ) {
      updateExistingFaq(
        { faqId: editFAQ.id, data },
        {
          onSuccess: () => {
            // handleFormClose();
            handleClose();
          },
        }
      );
      reset();
      clearEditFaq();
      return;
    }
    createFAQ(data, {
      onSuccess: () => {
        handleFormClose();
      },
    });
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
              {isEditting ? "Edit Faq" : "Create FAQ"}
            </h1>
            <FormTextInput
              type="number"
              name="faqCategoryId"
              label="CategoryId"
              placeholder="Id"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextArea
              name="question"
              label="Question"
              placeholder="Enter FAQ question"
              form={form}
              wrapperClass="mb-4"
            />
            <FormTextArea
              name="answer"
              label="Answer"
              placeholder="Fill Answer"
              form={form}
              wrapperClass="mb-4"
            />
          </div>
          <div>
            <Button
              type="button"
              onClick={handleFormClose}
              className="block w-full mb-4  bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="block w-full  text-white"
            >
              {isEditting ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default FAQCreateForm;
