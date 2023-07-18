import User from '../interfaces/User'
import { firestore } from '../firebase'
import { Firestore, collection, getDocs } from 'firebase/firestore'

// export const getUsers = async (): Promise<User[]> => {
//     const users: User[] = []

//     try {
//         const userCollection = collection(firestore, 'users')
//         const snapshot = await getDocs(userCollection)
//         snapshot.forEach((doc) => {
//             const data = doc.data()
//             users.push({
//                 id: doc.id,
//                 name: data.name,
//             } as User)
//         })
//     } catch (error) {
//         console.error('Error fetching users: ', error)
//     }

//     return users
// }

export async function getUsers(firestore: Firestore): Promise<User[]> {
    const usersCollection = collection(firestore, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    return usersSnapshot.docs.map((doc) => doc.data() as User)
}

export async function userIsAdmin(
    firestore: Firestore,
    userId: string
): Promise<boolean> {
    const usersCollection = collection(firestore, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    const user = usersSnapshot.docs
        .map((doc) => doc.data() as User)
        .filter((user) => user.id === userId)
    return user[0].role === 'admin'
}
