import styles from '../../styles/Admin.module.css';
import Metatags from "@/components/Metatags";
import AuthCheck from "@/components/AuthCheck";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { useContext, useState} from "react";

import { firestore, auth, serverTimestamp } from "@/lib/firebase";
import { UserContext } from "@/lib/context";
import PostFeed from "@/components/PostFeed";

export default function AdminPostsPage({ }) {
    return (
        <main> 
            <Metatags title="admin page" />
            <AuthCheck>
                <PostList />
                <CreateNewPost />
            </AuthCheck>
        </main>
    );
}

function PostList() {
    const ref = firestore.collection('users');
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            <h1>Manage your posts</h1>
            <PostFeed posts={posts} admin />
        </>
    );

}

function CreateNewPost() {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState('');

    //Ensure slug is URL safe
    const slug = encodeURI(kebabCase(title));
    
    //Validate Length
    const isValid = title.length > 3 && title.length < 100;

    const createPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);
    
        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: '# hello world!',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
        };

        await ref.set(data);

        toast.success('Post created!');

        router.push(`/admin/${slug}`);
    
    };

    return (
        <form onSubmit={createPost}>
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Article!"
            className={styles.input}
            />
            <p>
                <strong>Slug:</strong> {slug}
            </p>
            <button type="submit" disabled={!isValid} className="btn-green">
            Create New Post
            </button>
      </form>
    );
}