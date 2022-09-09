import firestore from '@react-native-firebase/firestore'

export async function toggleTodo(id: string, newValue: boolean) {
  await firestore()
    .collection('todos')
    .doc(id)
    .update({
      done: newValue,
    })
    .catch((err) => {
      console.log(err)
    })

  console.log('Updated Todo successfully')
}

export async function addTodo(title: string) {
  await firestore()
    .collection('todos')
    .add({
      title,
      done: false,
      timestamp: firestore.FieldValue.serverTimestamp(),
    })
    .catch((err) => {
      console.log(err)
    })

  console.log('Added Todo successfully')
}

export async function removeTodo(id: string) {
  firestore()
    .collection('todos')
    .doc(id)
    .delete()
    .catch((err) => {
      console.log(err)
    })

  console.log('Removed Todo successfully')
}
