import React from "react";
import { Button } from "flowbite-react";
const CallToAction = () => {
  return (
    <div>
      <div className="">
        <h2>want to learn more about javascript ?</h2>
        <p>Checkout these resources with 100 javascript Projects</p>
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
      <div className="p-7 ">
        <img
          src="https://user-images.githubusercontent.com/68542775/167072911-dc31eac8-6885-4a05-9c25-279ecce22a79.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
