import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const serverRoot = import.meta.env.VITE_SERVER_ROOT ?? '';
export default queryClient;
