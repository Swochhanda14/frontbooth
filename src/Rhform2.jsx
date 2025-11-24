import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Button from "./components/Button";
import ErrorMessage from "./components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// yup validation setup
const schema = yup.object({
  //name validation
  name: yup
    .string()
    .required("Username is required")
    .min(3, "Must be atleast 3 character long"),

  //email validation
  email: yup.string().email("Invalid Email").required("Email is required"),

  //phone validation
  phone: yup.array().of(
    yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
  ),

  //bio validation
  bio: yup
    .string()
    .required("Bio field is required")
    .min(10, "Write at least 10 character"),

  //country validation
  country: yup.string().required("Select one country"),

  //skill validation
  skills: yup
    .array()
    .of(
      yup.object({
        name: yup
          .string()
          .required("skill is required")
          .min(3, "skill must be at least 3 character"),
      })
    )
    .min(1, "At least one skill is required"),

  //gender validation
  gender: yup.string().required("Plese Select your Gender"),

  //password validation
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),

    // image validation
    img: yup 
     .mixed()
     .test("required", "Image is required", (value) => value && value.length > 0)
     .test("filesize", "Max size 2MB", (value) => value && value[0]?.size <= 2*1024*1024)
     .test("filetype", "Only jpeg/png/jpg", (value) => value && ["image/jpeg", "image/jpg", "image/png"].includes(value[0]?.type)),

    // check validation
    check: yup
     .bool()
     .oneOf([true], "You must agree to continue"),
});

function Rhform2() {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      //nested array
      phone: ["", ""],

      //dynamic field
      skills: [{ name: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = form;

  //for usefieldarray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data) => {
    alert("Form Submitted Successfully!", data);
    console.log("Form Data Submitted", data);
    reset();
  };

  return (
    <div className="formcontainer p-4 bg-amber-50 rounded-lg shadow-md max-w-md mx-auto mt-10 border-2">
      <h2 className="title text-2xl font-bold text-center">User Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* name field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold">
            Username:
          </label>
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

        {/* email field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
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

        {/* phone field */}
        <div className="flex flex-col">
          <label htmlFor="Primary-phone" className="font-bold">
            Primary-Phone No:
          </label>
          <input
            className="p-3 border rounded w-full mb-4"
            type="tel"
            id="Primary-phone"
            placeholder="Enter Primary phone Number"
            name="phone"
            {...register("phone[0]")}
          />
          <ErrorMessage message={errors.phone?.[0]?.message} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Secondary-phone" className="font-bold">
            Secondary-Phone No:
          </label>
          <input
            className="p-3 border rounded w-full mb-4"
            type="tel"
            id="Secondary-phone"
            placeholder="Enter Secondary phone Number"
            name="phone"
            {...register("phone[1]")}
          />
          <ErrorMessage message={errors.phone?.[1]?.message} />
        </div>

        {/* bio field */}
        <div className="flex flex-col">
          <label htmlFor="bio" className="font-bold">
            Bio
          </label>
          <textarea
            className="p-3 border rounded w-full mb-4"
            name="bio"
            id="bio"
            {...register("bio")}
          ></textarea>
          <ErrorMessage message={errors.bio?.message} />
        </div>

        {/* selection field */}
        <div className="flex flex-col">
          <label htmlFor="country" className="font-bold">
            Country Select
          </label>
          <select
            name="country"
            id="country"
            {...register("country")}
            className="p-3 border rounded w-full mb-4"
          >
            <option value="">Select</option>
            <option value="NE">Nepal</option>
            <option value="IN">India</option>
            <option value="Cn">China</option>
          </select>
          <ErrorMessage message={errors.country?.message} />
        </div>

        {/* skills field */}
        <div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`skills-${index}`} className="font-bold">
                Skills
              </label>
              <input
                className="p-3 border rounded w-full mb-4"
                type="text"
                id={`skills-${index}`}
                name="skills"
                {...register(`skills.${index}.name`)}
                placeholder="Add Skills"
              />
              <Button
                text="Delete"
                type="button"
                onClick={() => remove(index)}
              />

              <ErrorMessage message={errors.skills?.[index]?.name?.message} />
            </div>
          ))}

          <Button
            text="Add Skill"
            type="button"
            onClick={() => append({ name: "" })}
          />

          {errors.skills && <ErrorMessage message={errors.skills?.message} />}
        </div>

        {/* gender field */}
        <div className="flex flex-col">
          <div className="gender font-bold">Select gender</div>

          <div className="radiobtn flex flex-row gap-5">
            <label>
              <input type="radio" value="male" {...register("gender")} />
              Male
            </label>
            <label>
              <input type="radio" value="Female" {...register("gender")} />
              Female
            </label>
            <label>
              <input type="radio" value="Other" {...register("gender")} />
              Other
            </label>
          </div>
          <ErrorMessage message={errors.gender?.message} />
        </div>

        {/* age range */}
        <div className="flex flex-col">
          <label htmlFor="rate" className="font-bold">
            Rating
          </label>
          <input
            className="py-3 border rounded w-full mb-4"
            type="range"
            min="0"
            max="5"
            name="rate"
            {...register("rate")}
          />
        </div>

        {/* password field */}
        <div className="flex flex-col">
          <label htmlFor="pass" className="font-bold">
            Password:
          </label>
          <input
            className="p-3 border rounded w-full mb-4"
            type="password"
            id="pass"
            placeholder="Enter password"
            name="password"
            {...register("password")}
          />
          <ErrorMessage message={errors.password?.message} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confpass" className="font-bold">
            Confirm Password:
          </label>
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

        <div className="flex flex-col">
          <label htmlFor="upload" className="font-bold">Uplaod Image</label>
           <input
            className="p-3 border rounded w-full mb-4" 
            type="file" 
            name="img" 
            {...register("img")} />
        <ErrorMessage message={errors.img?.message}/>
        </div>

        {/* check box */}
        <div className="flex flex-col">
          <label htmlFor="check">
            <input type="checkbox" name="check" {...register("check")} />
            Agree to continue
          </label>
          <ErrorMessage message={errors.check?.message}/>
        </div>

        {/* submit button */}
        <Button type="submit" text="Submit" />
      </form>
      <DevTool control={control} />
    </div>
  );
}
export default Rhform2;
