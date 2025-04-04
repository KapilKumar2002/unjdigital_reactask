import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/user";
import { ApiEndpoints } from "../../constants/apiEndpoints";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (page: number = 1) => {
        const url = `${ApiEndpoints.baseUrl}${ApiEndpoints.users.list}${page}`
        const response = await axios.get(url);
        
        return {
            users: response.data.users as User[],
            page: page + 1,
            hasMore: response.data.users.length > 0
        };
    }
)



