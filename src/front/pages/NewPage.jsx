
import React, { useState, useEffect } from "react";

export const NewPage = () => {
    const [l_posts, setPosts] = useState([]);
    const [str_error, setError] = useState(null);
    const [is_loading, setIsLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const str_url = "https://jsonplaceholder.typicode.com/posts";
            const response = await fetch(str_url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setError(`No se pudieron obtener los posts: ${error.message}`);
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Posts de JSONPlaceholder</h1>

            {is_loading && <p className="text-center">Cargando posts...</p>}

            {str_error && <div className="alert alert-danger">{str_error}</div>}

            {!is_loading && !str_error && (
                <div className="row">
                    {l_posts.map((post) => (
                        <div key={post.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text flex-grow-1">{post.body}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
