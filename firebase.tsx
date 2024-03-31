// const firebaseConfig = {
//   apiKey: 'AIzaSyANf_lBflatQJ7voNOin4hdn5bdU8ZfdUM',
//   authDomain: 'bonding-da60e.firebaseapp.com',
//   projectId: 'bonding-da60e',
//   storageBucket: 'bonding-da60e.appspot.com',
//   messagingSenderId: '193807438813',
//   appId: '1:193807438813:web:099c43d91163e3d200dc34',
//   measurementId: 'G-WL5W1TPSM5',
// }

import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyANf_lBflatQJ7voNOin4hdn5bdU8ZfdUM',
  authDomain: 'bonding-da60e.firebaseapp.com',
  projectId: 'bonding-da60e',
  storageBucket: 'bonding-da60e.appspot.com',
  messagingSenderId: '193807438813',
  appId: '1:193807438813:web:099c43d91163e3d200dc34',
  databaseURL:
    'https://bonding-da60e-default-rtdb.europe-west1.firebasedatabase.app/',
  measurementId: 'G-WL5W1TPSM5',
}
const firebaseApp = initializeApp(firebaseConfig)
const db = getDatabase(firebaseApp)

export default db
