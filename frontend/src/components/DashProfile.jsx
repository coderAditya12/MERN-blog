// Import necessary tools and components
import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// This is the main component for the user's profile dashboard
const DashProfile = () => {
  // Get the current user's information from the app's state
  const { currentUser } = useSelector((state) => state.user);

  // Set up variables to manage the profile picture
  const [imageFile, setImageFile] = useState(null); // The file of the new profile picture
  const [imageUrl, setImageUrl] = useState(null); // The URL of the profile picture
  const profilePicker = useRef(); // A reference to the hidden file input

  // Variables to track the upload progress and any errors
  const [imageFileloadedProgress, setImageFileloadedProgress] = useState(null);
  const [imageError, setImageError] = useState(null);

  // This function runs when the user selects a new profile picture
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Create a temporary URL for the new image
    }
  };

  // This effect runs whenever the image file changes
  useEffect(() => {
    if (imageFile) {
      uploadImage(); // Start uploading the new image
    }
  }, [imageFile]);

  // This function handles uploading the new profile picture
  const uploadImage = async () => {
    setImageError(null);
    const storage = getStorage(app); // Get access to the storage system
    const fileName = new Date().getTime() + imageFile.name; // Create a unique file name
    const storageRef = ref(storage, fileName); // Create a reference to where the file will be stored
    const uploadTask = uploadBytesResumable(storageRef, imageFile); // Start the upload

    // Monitor the upload process
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calculate and update the upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileloadedProgress(progress.toFixed(0));
      },
      (error) => {
        // If there's an error, update the error message
        setImageError("Could not upload image (File must be less than 2MB)");
        setImageFile(null);
        setImageFileloadedProgress(null);
        setImageUrl(null);
      },
      () => {
        // When the upload is complete, get and set the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  // This is what the component displays
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        {/* Hidden file input for selecting a new profile picture */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={profilePicker}
          hidden
        />
        {/* Clickable area to open file selector */}
        <div
          className="w-32 h-32 self-center shadow-lg overflow-hidden cursor-pointer rounded-full relative"
          onClick={() => profilePicker.current.click()}
        >
          {imageFileloadedProgress && (
            <CircularProgressbar
              value={imageFileloadedProgress || 0}
              text={`${imageFileloadedProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileloadedProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-8 border-[lightgray] ${
              setImageFileloadedProgress &&
              imageFileloadedProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageError && <Alert color="failure">{imageError}</Alert>}
        {/* Input fields for username, email, and password */}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        {/* Button to submit the form */}
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
        {/* Options to delete account or sign out */}
        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
