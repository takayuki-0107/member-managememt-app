import { signInAction, signOutAction } from './actions';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';
import { push } from 'connected-react-router';
// import firebase from '../../firebase/index';

export const listenAuthState = () => {
  return async (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            console.log(data);

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};

// export const googleAsync = () => {
//   return async (dispatch) => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     console.log(provider);
//     firebase
//       .auth()
//       .signInWithRedirect(provider)
//       .then((result) => {
//         const user = result.user;

//         if (user) {
//           const uid = user.uid;
//           const timestamp = FirebaseTimestamp.now();

//           const userInitialData = {
//             create_at: timestamp,
//             email: user.email,
//             role: 'customer',
//             uid: uid,
//             updated_at: timestamp,
//             username: user.displayName,
//             photoURL: user.photoURL,
//           };
//           db.collection('users')
//             .doc(uid)
//             .set(userInitialData)
//             .then(() => {
//               dispatch(push('/'));
//             });
//         }
//       });
//   };
// };

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (username === '' || email === '' || confirmPassword === '') {
      alert('必須項目が未入力です');
      return false;
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度お試しください。');
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            create_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
            username: username,
          };
          db.collection('users')
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push('/'));
            });
        }
      });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です');
      return false;
    }
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      console.log(result);
      const user = result.user;
      if (user) {
        const uid = user.uid;
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
            dispatch(push('/'));
          });
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push('/signin'));
    });
  };
};
