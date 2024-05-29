import { useCallback, useEffect, useReducer } from 'react'

type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void]

function useAsyncState<T>(initialValue: T | null = null): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null | undefined = null): [boolean, T | null] => [false, action],
    [true, initialValue],
  ) as UseStateHook<T>
}

async function setStorageItemAsync(key: string, value: string | null | undefined) {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, value)
    }
  } catch (e) {
    console.error('Local storage is unavailable:', e)
  }
}

async function getStorageItemAsync(key: string): Promise<string | null> {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.error('Local storage is unavailable:', e)
    return null
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>()

  const setValue = useCallback(
    (value: string | null | undefined) => {
      setStorageItemAsync(key, value).then(() => {
        setState(value || null)
      })
    },
    [key, setState],
  )

  useEffect(() => {
    getStorageItemAsync(key).then(value => {
      setState(value || null)
    })
  }, [key, setState])

  return [state, setValue]
}
