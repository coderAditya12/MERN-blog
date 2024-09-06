// Import necessary tools and components
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// This is the main component for the user's profile dashboard
const DashProfile = () => {
  // Get the current user's information from the app's state
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Set up variables to manage the profile picture
  const [imageFile, setImageFile] = useState(null); // The file of the new profile picture
  const [imageUrl, setImageUrl] = useState(null); // The URL of the profile picture
  const profilePicker = useRef(); // A reference to the hidden file input

  // Variables to track the upload progress and any errors
  const [imageFileloadedProgress, setImageFileloadedProgress] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModel, setShowModel] = useState(false);
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
    setImageFileUploading(true);
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
        setImageFileUploading(false);
      },
      () => {
        // When the upload is complete, get and set the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleUpdateChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    e.preventDefault();
    // Update the user's profile information in the database
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait while the image is being uploaded");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  const handleDeleteuser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // This is what the component displays
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          onChange={handleUpdateChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleUpdateChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleUpdateChange}
        />
        {/* Button to submit the form */}
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModel(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteuser}>
                Yes, I'm sure
              </Button>
              <Button onClick={() => setShowModel(false)} color="gray">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
