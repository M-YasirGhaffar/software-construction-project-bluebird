import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

/**
 * UserCard Component
 *
 * This component displays user information and provides a button to sign out.
 *
 * @param {Object} props - The component props.
 * @param {Session} props.session - The user session information.
 * @returns {React.Component} - The rendered UserCard component.
 */
function UserCard({ session }: { session: Session }) {
  /**
   * Handles the sign-out process when the button is clicked.
   */
  function handleSignOut() {
    signOut()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((err) => {
        console.error("Error during sign-out:", err);
      });
  }

  return (
    <div>
      <div>
        Name: {session.user?.name}
        <br />
        Email: {session.user?.email}
      </div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default UserCard;
