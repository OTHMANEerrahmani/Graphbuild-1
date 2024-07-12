import { useRef, useState } from "react";
import { styles } from "../../../styles";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="flex-[0.75]   dark:bg-black-100 bg-white dark:bg-darkSecondary shadow-md p-4 md:p-8 md:m-2 rounded-2xl ">
      <h3
        className={`${styles.sectionHeadText} font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] md:text-center`}
      >
        Hit me up!
      </h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8 "
      >
        <div className="flex md:flex-row flex-col gap-8 w-full md:space-x-2">
          <label className="flex flex-col md:w-1/2">
            <span className="font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary  text-tertiary-black  rounded-lg font-medium border-[1px] dark:border-white border-primary"
            />
          </label>
          <label className="flex flex-col md:w-1/2">
            <span className="font-medium mb-4 ">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary  text-tertiary-black  rounded-lg font-medium border-[1px] dark:border-white border-primary"
            />
          </label>
        </div>

        <label className="flex flex-col">
          <span className="font-medium mb-4">Your Message</span>
          <textarea
            rows={7}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What you want to say?"
            className="bg-white py-4 px-6 placeholder:text-secondary  text-tertiary-black  rounded-lg font-medium border-[1px] dark:border-white border-primary "
          />
        </label>

        <button
          type="submit"
          className="py-3 px-8 rounded-md outline-none w-full dark:text-black text-white font-bold shadow-sm shadow-primary bg-darkSecondary     dark:bg-white"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
