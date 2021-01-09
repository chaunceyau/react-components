import React from "react";
import { toast } from "react-hot-toast";
import * as RHForm from "react-hook-form";
//
import { Button } from "../button";
import { Toasts } from "../misc/toasts";
import { FormInput } from "./elements/input";
import { FormUpload } from "./elements/upload";
import { FormOptions } from "./elements/options";
import { FormSubmitButton } from "./elements/misc/submit";

interface FormProps {
  // children: React.ReactNode | React.ReactNode[];
  title?: string;
  styled?: boolean;
  description?: string;
  clearValuesOnSubmit?: boolean;
  children: React.ReactElement | React.ReactElement[];
  defaultValues?: { [key: string]: any };
  saveMessage?: string;
  // UPDATE
  // onSubmit:;
  onSubmit: (data: any) => void | Promise<void>;
}

// TODO: am i using formsubmitbutton?
const ValidFormComponents: any = [FormInput, FormSubmitButton, FormOptions, FormUpload];

function validateChildrenAndInitializeOptionForm(
  children: React.ReactElement | React.ReactElement[],
  defaultValues?: { [key: string]: any }
) {
  React.Children.map(children, (child) => {
    // make sure valid child
    if (!ValidFormComponents.includes(child.type)) {
      // fn = "Error: function FormHeader({ ...etc }) { }"
      const fn: string = child.type.toString();
      const firstParenthesisIndex = fn.indexOf("(");
      // 9 = "function ".length
      const componentName: string = fn.slice(9, firstParenthesisIndex);
      throw new Error(`${componentName} is not a valid child of the Form component.`);
    }
    // add default values if not provided for options
    switch (child.type) {
      case FormOptions: {
        const noDefaultValueForOptions = !defaultValues || !defaultValues[child.props.variableName];
        if (noDefaultValueForOptions) {
          // default to first value
          Object.assign(defaultValues, { [child.props.variableName]: child.props.options[0].name });
        }
      }
    }
  });
}

export function Form({
  onSubmit: _onSubmit,
  children,
  title,
  description,
  styled,
  clearValuesOnSubmit,
  defaultValues,
  saveMessage,
}: FormProps) {
  //
  validateChildrenAndInitializeOptionForm(children, defaultValues);

  const methods = RHForm.useForm({ defaultValues });
  const { handleSubmit, reset, formState, setValue } = methods;

  const onSubmit = async (data: any) => {
    const isFunctionAsync = _onSubmit.constructor.name === "AsyncFunction";

    let deleteFiles: { [key: string]: string[] } = {};

    React.Children.forEach(children, async (child) => {
      if (child.type === FormUpload) {
        deleteFiles[child.props.name] = data[child.props.name].reduce((acc: any, val: any) => {
          return val.status === "PENDING_REMOVAL" ? acc.concat(val.id) : acc;
        }, []);
      }
    });

    try {
      for (const [, value] of Object.entries(deleteFiles)) {
        await new Promise((res) =>
          setTimeout(() => {
            res(value);
          }, 500)
        );
      }

      await _onSubmit(data);

      for (const [key, deletes] of Object.entries<any>(deleteFiles)) {
        setValue(
          key,
          data[key].filter((val: any) => !deletes.some((d: string) => d === val.id))
        );
      }

      if (clearValuesOnSubmit) {
        reset();
      }

      if (isFunctionAsync) {
        toast.success("successfully submitted your info");
      }
    } catch (err) {
      if (isFunctionAsync) {
        toast.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styled ? "border rounded-t-lg bg-white py-6 px-8" : ""}>
        {title ? <FormHeader title={title} description={description} /> : null}
        <div className="flex flex-col space-y-4 py-6">
          <RHForm.FormProvider {...methods}>{children}</RHForm.FormProvider>
        </div>
      </div>
      <div
        className={styled ? "bg-gray-100 py-4 px-8 rounded-b-lg border border-t-0 flex justify-end" : ""}
      >
        <Button loading={formState.isSubmitting} content={saveMessage || "Save"} type="submit" />
      </div>

      <Toasts />
    </form>
  );
}

interface FormHeaderProps {
  title: string;
  description?: string;
}

function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : null}
    </div>
  );
}
