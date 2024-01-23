import { auth, googleAuthProvider } from "@/lib/firebase"
import { useContext } from 'react';
import { UserContext } from '@/lib/context';

export default function Enter(props) {
    const { user, username } = useContext(UserContext);
    
    //1. user signed out <SignInButton />
    //2. user signed in, but missing username <UsernameForm />
    //3  user signed in, has username <SignOutButton />
    return (
        <main>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
            
        </main>
    );
}

function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    return (
        <button className ="btn-google" onClick = {signInWithGoogle}>
            <img src = {'/google.png'} /> Sign in with Google
        </button>
    )
}

function SignOutButton() {
    return (<button onClick={() => auth.signOut()}>Sign Out</button>)
}

function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="username" value={formValue} onChange={onChange}/>
                </form>
            </section>
        )
    );
}