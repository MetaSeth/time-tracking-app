import { Firestore, collection, getDocs } from 'firebase/firestore'
import User from '../interfaces/User'

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
