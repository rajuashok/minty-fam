import useSWR from "swr";
import { get } from "../lib/api";

export default function useUserData() {
  const { data, error } = useSWR(
    'api/user',
    async () => {return (await get('/api/user', true)).json()});

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error
  }
}