import axios from "axios";

// Get Alarm sounds
export const getAllAlarms = async () => {
  try {
    const response = await axios.get("setting/ticking");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Get Ticking sounds
export const getAllTickings = async () => {
  try {
    const response = await axios.get("setting/alarm");
    return response;
  } catch (error) {
    console.log(error);
  }
};