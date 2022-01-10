import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../util/constants";
import { Errors } from "../commonInterfaces";

export const loginByEmail = createAsyncThunk<
  {},
  { email: string; password: string },
  {
    rejectValue: { errors: Errors };
  }
>("user/loginByEmail", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post<{
      errors?: Errors;
    }>("user/login", { ...data });

    if (response.data.errors) {
      return thunkAPI.rejectWithValue({ errors: response.data.errors });
    }

    return thunkAPI.fulfillWithValue({});
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errors: {
        general: "Something went wrong",
      },
    });
  }
});

export const changeAvatar = createAsyncThunk<
  {},
  { avatar: File },
  { rejectValue: { errors: Errors } }
>("user/changeAvatar", async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("avatar", data.avatar);

    const response = await axiosInstance.post<{}>("user/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response);

    return thunkAPI.fulfillWithValue({});
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errors: {
        general: "Something went wrong",
      },
    });
  }
});
