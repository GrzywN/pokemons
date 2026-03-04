import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, onlineManager } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { addNetworkStateListener, getNetworkStateAsync } from 'expo-network';

const SECOND_IN_MS = 1000 as const;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;

const STALE_TIME_IN_MINUTES = 5 as const;
const CACHE_TIME_IN_MINUTES = 10 as const;
const RETRY_COUNT = 2 as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_IN_MINUTES * MINUTE_IN_MS,
      gcTime: CACHE_TIME_IN_MINUTES * MINUTE_IN_MS,
      retry: RETRY_COUNT,
      refetchOnWindowFocus: false,
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

onlineManager.setEventListener((setOnline) => {
  let initialised = false;

  const eventSubscription = addNetworkStateListener((state) => {
    initialised = true;
    setOnline(!!state.isConnected);
  });

  getNetworkStateAsync()
    .then((state) => {
      if (!initialised) {
        setOnline(!!state.isConnected);
      }
    })
    .catch(() => {
      // getNetworkStateAsync can reject on some platforms/SDK versions
    });

  return eventSubscription.remove;
});
