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
    <div className="max-w-2xl mx-auto mt-12 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">User Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Username:
          </label>
          <input
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            type="text"
            id="name"
            placeholder="Enter Username"
            name="name"
            {...register("name")}
          />
          <ErrorMessage message={errors.name?.message} />
        </div>

        {/* email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <input
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            type="text"
            id="email"
            placeholder="Enter Email"
            name="email"
            {...register("email")}
          />
          <ErrorMessage message={errors.email?.message} />
        </div>

        {/* phone field */}
        <div>
          <label htmlFor="Primary-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Primary-Phone No:
          </label>
          <input
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            type="tel"
            id="Primary-phone"
            placeholder="Enter Primary phone Number"
            name="phone"
            {...register("phone[0]")}
          />
          <ErrorMessage message={errors.phone?.[0]?.message} />
        </div>
        <div>
          <label htmlFor="Secondary-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Secondary-Phone No:
          </label>
          <input
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            type="tel"
            id="Secondary-phone"
            placeholder="Enter Secondary phone Number"
            name="phone"
            {...register("phone[1]")}
          />
          <ErrorMessage message={errors.phone?.[1]?.message} />
        </div>

        {/* bio field */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            name="bio"
            id="bio"
            {...register("bio")}
          ></textarea>
          <ErrorMessage message={errors.bio?.message} />
        </div>

        {/* selection field */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country Select
          </label>
          <select
            name="country"
            id="country"
            {...register("country")}
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
            <div key={field.id} className="space-y-1 mb-2">
              <label htmlFor={`skills-${index}`} className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                className="mt-1"
              />

              <ErrorMessage message={errors.skills?.[index]?.name?.message} />
            </div>
          ))}

          <Button
            text="Add Skill"
            type="button"
            onClick={() => append({ name: "" })}
            className="mt-1"
          />

          {errors.skills && <ErrorMessage message={errors.skills?.message} />}
        </div>

        {/* gender field */}
        <div>
          <div className="text-sm font-medium text-gray-700">Select gender</div>

          <div className="flex gap-6 mt-1">
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
        <div>
          <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <input
            className="w-full"
            type="range"
            min="0"
            max="5"
            name="rate"
            {...register("rate")}
          />
        </div>

        {/* password field */}
        <div>
          <label htmlFor="pass" className="block text-sm font-medium text-gray-700 mb-1">
            Password:
          </label>
          <input
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            type="password"
            id="pass"
            placeholder="Enter password"
            name="password"
            {...register("password")}
          />
          <ErrorMessage message={errors.password?.message} />
        </div>
        <div>
          <label htmlFor="confpass" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password:
          </label>
          <input
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            type="password"
            id="confpass"
            placeholder="Confirm password"
            name="confirmpassword"
            {...register("confirmpassword")}
          />
          <ErrorMessage message={errors.confirmpassword?.message} />
        </div>

        <div>
          <label htmlFor="upload" className="block text-sm font-medium text-gray-700 mb-1">Uplaod Image</label>
           <input
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
            type="file" 
            name="img" 
            {...register("img")} />
        <ErrorMessage message={errors.img?.message}/>
        </div>

        {/* check box */}
        <div>
          <label htmlFor="check" className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="check" {...register("check")} />
            Agree to continue
          </label>
          <ErrorMessage message={errors.check?.message}/>
        </div>

        {/* submit button */}
        <Button type="submit" text="Submit" className="w-full mt-2" />
      </form>
      <DevTool control={control} />
    </div>
  );
}
export default Rhform2;
