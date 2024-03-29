// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {API_URL} from "../../api/api";

export interface createUserDto {
  avatar: string;
  firstName: string;
  lastName: string;
}
export interface User extends createUserDto {
  id: number;
  isActive: boolean
}

export interface UserApiResponse {
  users: User[]

}

// Define a service using a base URL and expected endpoints
export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/users` }),
  reducerPath: "usersApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Users"],
  endpoints: build => ({
    
    addUser: build.query({
      query: (body: createUserDto) => ({
        url: `${API_URL}/users/add`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

// Hooks are auto-generated by RTK-Query
// Same as `quotesApiSlice.endpoints.getQuotes.useQuery`
export const { useAddUserQuery} = usersApiSlice
