import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Input from "./components/Input";
import Button from "./components/Button";
import ErrorMessage from "./components/ErrorMessage";

function Rhform() {
  const form = useForm({
    defaultValues: {
        username: "",
    }
  });
  const { register, control, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    alert("Form Submitted Successfully!", data);
    console.log("Form Data Submitted", data);
  };

  return (
    <div className="formcontainer p-4 bg-amber-50 rounded-lg shadow-md max-w-md mx-auto mt-10 border-2">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="username">Username:</label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your Name"
          register={register}
          validation={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
          }}
        />
        <ErrorMessage message={errors.username?.message} />

        <label htmlFor="email">Email:</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your Email"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
        />
        <ErrorMessage message={errors.email?.message} />

        <label htmlFor="phone">Phone No:</label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your Number"
          register={register}
          validation={{
            required: "Phone number is required",
            pattern: { value: /^\d{10}$/, message: "Invalid phone number" },
          }}
        />
        <ErrorMessage message={errors.phone?.message} />

        <label htmlFor="password">Password:</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your Password"
          register={register}
          validation={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
        />
        <ErrorMessage message={errors.password?.message} />

        <label htmlFor="confirmpass">Confirm Password:</label>
        <Input
          id="confirmpass"
          name="confirmpass"
          type="password"
          placeholder="Confirm your Password"
          register={register}
          validation={{
            required: "Confirm your password.",
            validate: (value) => value === watch("password") || "Passwords do not match",
          }}
        />
        <ErrorMessage message={errors.confirmpass?.message}/>

        <Button type="submit" text="Submit" />
      </form>
      <DevTool control={control} />
    </div>
  );
}
export default Rhform;
