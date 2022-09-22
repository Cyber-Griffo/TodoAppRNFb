import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export function checkForTimestamp(
  a: FirebaseFirestoreTypes.Timestamp,
  b: FirebaseFirestoreTypes.Timestamp
) {
  if (a.valueOf() < b?.valueOf()) {
    return -1
  }
  return 1
}
