import * as React from "react";
import { useFormContext } from "react-hook-form";
import { DropzoneInputProps } from "react-dropzone";

interface UploadInputProps {
  hidden: boolean;
  getRootProps?: any;
  horizontal?: boolean;
  getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps;
}

export function UploadInput(props: UploadInputProps) {
  const { formState } = useFormContext();

  const svgClasses = ["text-gray-400"];
  const flexWrapper = ["flex items-center space-x-2"];
  const containerClasses = ["border rounded-md flex cursor-pointer rounded-lg"];

  if (props.horizontal) {
    containerClasses.push("justify-start pl-4 py-4");
    svgClasses.push("h-6 w-6 mr-3");
  } else {
    containerClasses.push("flex-col pt-4 pb-5");
    svgClasses.push("h-8 w-8 mb-2 mx-auto");
    flexWrapper.push("flex-col");
  }

  if (formState.isSubmitting) {
    containerClasses.push("bg-gray-200 cursor-not-allowed");
    flexWrapper.push("opacity-25");
    svgClasses.push("opacity-25");
  } else {
    containerClasses.push("bg-gray-100");
  }

  if (props.hidden) {
    containerClasses.push("hidden");
  }

  return (
    <div className={containerClasses.join(" ")} {...props.getRootProps()}>
      <svg
        className={svgClasses.join(" ")}
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={flexWrapper.join(" ")}>
        <div className="flex text-sm text-gray-600">
          <span className="relative rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            Upload a file
          </span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            {...props.getInputProps()}
            disabled={formState.isSubmitting}
          />
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500 mt-px">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  );
}
