import React from "react";
import { Button } from "flowbite-react";
const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl ">want to learn more about javascript ?</h2>
        <p className="text-gray-500 my-2">Checkout these resources with 100 javascript Projects</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://netflix-gpt-git-main-adityas-projects-62783948.vercel.app//"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netflix Project
          </a>
        </Button>
      </div>
      <div className="p-7 w-2/3">
        <img
          src="https://user-images.githubusercontent.com/68542775/167072911-dc31eac8-6885-4a05-9c25-279ecce22a79.png" className="object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
