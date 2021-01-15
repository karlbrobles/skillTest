import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "./Axios";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const baseUrl = "http://localhost:3001";

    useEffect(() => {
        axios.get("/recipes").then((res) => {
            setRecipes(res.data);
        });
    }, []);

    return (
        <div className="container">
            <div className="flex justify-between">
                <h1>Recipes</h1>
                <div className="flex align-center">
                    <Link to="/recipe-form" className="btn">
                        Create
                    </Link>
                </div>
            </div>
            {recipes && recipes.length > 0 && (
                <table className="recipes">
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th></th>
                    </tr>

                    {recipes.map((recipe, key) => {
                        return (
                            <tr key={key}>
                                <td>
                                    {recipe &&
                                        recipe.images &&
                                        recipe.images.small && (
                                            <img
                                                src={
                                                    baseUrl +
                                                    recipe.images.small
                                                }
                                            />
                                        )}
                                </td>
                                <td>
                                    <Link
                                        className="link"
                                        to={`/recipe-view/${recipe.uuid}`}
                                    >
                                        <h3>{recipe.title}</h3>
                                    </Link>
                                </td>
                                <td>
                                    <div>{recipe.description}</div>
                                </td>
                                <td>
                                    <Link
                                        to={`/recipe-form/${recipe.uuid}`}
                                        className="btn"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            )}
        </div>
    );
};

export default Recipes;
