import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import loginsignupImage from "../imges/cont.png"
import conttwoImage from "../imges/conttwo.gif"

const Contact = () => {
 const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_b8h3ivl', 'template_bgc9zwg', form.current, 'hpYLilprzzRjcueNq')
      .then((result) => {
          console.log(result.text);
          console.log("message")
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div className="p-3 m:p-4 flex">
      <img src={conttwoImage} className="w-100"/>
    <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
    <div className="w-full h-full overflow-hidden m-auto">
          <img src={loginsignupImage} className="w-full"/>
    </div>
    <form ref={form} className="w-full py-3 flex flex-col" onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500" />
      <label>Email</label>
      <input type="email" name="user_email" className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline focus-within:outline-blue-500" />
      <label>Message</label>
      <textarea name="message" className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline focus-within:outline-blue-500" />
      <input type="submit" value="Send" className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 curser-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4" />
    </form>
    </div>
    </div>
  );
};

export default Contact
