import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./Axios";

const RecipesView = () => {
    const [recipe, setRecipe] = useState({});
    const [specials, setSpecials] = useState([]);

    const baseUrl = "http://localhost:3001";
    let params = useParams();

    useEffect(() => {
        if (params.slug) {
            axios.get("/recipes/" + params.slug).then((response) => {
                let r = response.data;
                setRecipe(r);
            });

            axios.get("/specials").then((response) => {
                setSpecials(response && response.data);
            });
        }
    }, []);

    if (Object.keys(recipe).length == 0) {
        return <div></div>;
    }

    return (
        <div className="recipe-view">
            {console.log(specials)}
            {recipe.images && recipe.images.full && (
                <img src={baseUrl + recipe.images.full} />
            )}
            <h3>{recipe.title}</h3>
            <div>{recipe.description}</div>
            <div>
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <ul className="ingredients">
                        {recipe.ingredients.map((ingredient, index) => {
                            return (
                                <li key={index} className="ingredient">
                                    {ingredient.name}{" "}
                                    {ingredient.amount
                                        ? `( ${ingredient.amount}  ${ingredient.measurement} )`
                                        : ""}
                                    <div className="specials">
                                        {specials &&
                                            specials.length > 0 &&
                                            specials.map((special, indx) => {
                                                if (
                                                    special.ingredientId ===
                                                    ingredient.uuid
                                                ) {
                                                    return (
                                                        <div
                                                            key={indx}
                                                            className="special"
                                                        >
                                                            <div>
                                                                {special.title}
                                                            </div>
                                                            <div>
                                                                {special.text}
                                                            </div>
                                                            <div>
                                                                Type:{" "}
                                                                {special.type}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            })}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            <div>
                {recipe.directions && recipe.directions.length > 0 && (
                    <ol>
                        {recipe.directions.map((direction, index) => {
                            return (
                                <li key={index}>
                                    {direction.instructions}{" "}
                                    {direction.optional ? "(Optional)" : ""}
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>
        </div>
    );
};

export default RecipesView;
