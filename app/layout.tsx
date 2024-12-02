// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import "./globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <head>
//           <link
//             href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
//             rel="stylesheet"
//           />
//         </head>
//         <body>
//           <header className="header-container">
//             <SignedOut>
//               <div className="sign-in-container">
//                 <SignInButton />
//               </div>
//             </SignedOut>
//             <SignedIn>
//               <div className="user-button">
//                 <UserButton />
//               </div>
//             </SignedIn>
//           </header>
//           <main>{children}</main>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head></head>
        <body>
          <header className="header-container">
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
              <div className="user-button">
                <UserButton />
              </div>
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
