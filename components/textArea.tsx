import type { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  name?: string;
  label?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

const TextArea = ({
  name,
  label,
  register,
  ...rest
}: TextAreaProps) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        {...register}
        id={name}
        {...rest}
        rows={4}
        className="focus:border-1 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
    </div>
  );
};

export default TextArea;
