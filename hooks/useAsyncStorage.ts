import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export default function useAsyncStorage(key: any, initialValue: any) {
  const [storedValue, setStoredValue] = useState()

  async function loadData(key: any, initialValue: any) {
    try {
      const item = await AsyncStorage.getItem(key)
      const value = item ? JSON.parse(item) : initialValue
      setStoredValue(value)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadData(key, initialValue)
  }, [key, initialValue])

  const storeData = async (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, storeData]
}
