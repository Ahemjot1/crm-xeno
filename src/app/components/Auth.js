// // src/components/Auth.js
// import { signIn, signOut, useSession } from 'next-auth/react';

// export default function Auth() {
//   const { data: session } = useSession();

//   return (
//     <div>
//       {session ? (
//         <>
//           <p>Welcome, {session.user.name}</p>
//           <button onClick={() => signOut()}>Sign Out</button>
//         </>
//       ) : (
//         <button onClick={() => signIn('google')}>Sign In with Google</button>
//       )}
//     </div>
//   );
// }
