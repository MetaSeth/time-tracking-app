import User from '../interfaces/User'
import { collection, getDocs } from 'firebase/firestore'
import { getFirestoreInstance } from '../firebase'

const firestore = getFirestoreInstance()

export async function getUsers(): Promise<User[]> {
    const usersCollection = collection(firestore, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    return usersSnapshot.docs.map((doc) => doc.data() as User)
}

export async function userIsAdmin(userId: string): Promise<boolean> {
    const usersCollection = collection(firestore, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    const user = usersSnapshot.docs
        .map((doc) => doc.data() as User)
        .filter((user) => user.id === userId)
    return user[0].role === 'admin'
}
