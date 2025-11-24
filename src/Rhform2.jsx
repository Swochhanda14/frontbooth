import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Button from "./components/Button";
import ErrorMessage from "./components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


  // yup validation setup
  const schema = yup.object({
    name: yup.string().required("Username is required").min(3, "Must be atleast 3 character long"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
    confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
  });

function Rhform2() {
  const form = useForm({
    resolver: yupResolver(schema)
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = form;

  const onSubmit = (data) => {
    alert("Form Submitted Successfully!", data);
    console.log("Form Data Submitted", data);
    reset();
  };

  return (
    <div className="formcontainer p-4 bg-amber-50 rounded-lg shadow-md max-w-md mx-auto mt-10 border-2">
      <h2 className="title text-2xl font-bold text-center">User Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="Username" className="font-bold">Username:</label>
          <input
            className="p-3 border rounded w-full mb-4"
            type="text"
            id="name"
            placeholder="Enter Username"
            name="name"
            {...register("name")}
          />
        <ErrorMessage message={errors.name?.message} />
        </div>
        

        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold">Email:</label>
          <input
            className="p-3 border rounded w-full mb-4"
            type="text"
            id="email"
            placeholder="Enter Email"
            name="email"
            {...register("email")}
          />
        <ErrorMessage message={errors.email?.message} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="font-bold">Phone No:</label>
          <input
            className="p-3 border rounded w-full mb-4"
            type="tel"
            id="phone"
            placeholder="Enter phone Number"
            name="phone"
            {...register("phone")}
          />
        <ErrorMessage message={errors.phone?.message} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="pass" className="font-bold">Password:</label>
          <input
            className="p-3 border rounded w-full mb-4"
            type="password"
            id="pass"
            placeholder="Enter password"
            name="password"
            {...register("password")}
          />
        <ErrorMessage message={errors.password?.message}/>
        </div>

        <div className="flex flex-col">
            <label htmlFor="confpass" className="font-bold">Confirm Password:</label>
            <input
              className="p-3 border rounded w-full mb-4"
              type="password"
              id="confpass"
              placeholder="Confirm password"
              name="confirmpassword"
              {...register("confirmpassword")}
            />
            <ErrorMessage message={errors.confirmpassword?.message} />
        </div>

        <Button type="submit" text="Submit" />
      </form>
      <DevTool control={control} />
    </div>
  );
}
export default Rhform2;
