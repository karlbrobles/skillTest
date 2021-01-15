import React, { useEffect, useState } from "react";
import { useForm } from "./useForm";
import axios from "./Axios";
import { useParams, useHistory } from "react-router-dom";

export default function RecipeForm() {
    const params = useParams();
    const history = useHistory();

    const initialValues = {
        cookTime: 0,
        description: "",
        directions: [],
        editDate: "",
        images: {},
        ingredients: [],
        postDate: "",
        prepTime: 0,
        servings: 0,
        title: "",
    };

    const initialDirections = {
        instructions: "",
        optional: false,
    };

    const initialIngredients = {
        amount: 0,
        measurement: "",
        name: "",
    };

    const [values, setValues] = useState(initialValues);

    const [ingredients, setIngredients] = useState([]);
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        if (params.slug) {
            axios.get(`/recipes/${params.slug}`).then((response) => {
                let recipe = response.data;
                setValues({ ...values, ...recipe });
                setIngredients(recipe.ingredients ? recipe.ingredients : []);
                setDirections(recipe.directions ? recipe.directions : []);
            });
        }
    }, []);

    const handleSubmit = () => {
        values.directions = directions;
        values.ingredients = ingredients;

        setValues({
            ...values,
        });

        if (params.slug) {
            axios.put(`/recipes/${params.slug}`, values);
        } else {
            axios.post("/recipes", values).then((res) => {
                if (res.data && res.data.uuid) {
                    history.push(`/recipe-form/${res.data.uuid}`);
                }
            });
        }
    };

    const addIngredient = () => {
        setIngredients([...ingredients, initialIngredients]);
    };

    const addDirection = () => {
        setDirections([...directions, initialDirections]);
    };

    const handleIngredientDelete = (i) => {
        const ing = ingredients.filter((ingre) => ingre !== i);
        setIngredients([...ing]);
    };

    const handleDirectionDelete = (i) => {
        const ing = directions.filter((ingre) => ingre !== i);
        setDirections([...ing]);
    };

    return (
        <div className="recipe-form">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {console.log(values)}
                <div className="flex justify-between">
                    <h1>Recipe</h1>
                    <div className="flex align-center">
                        <button className="btn">Save</button>
                    </div>
                </div>
                <div className="grid grid-column-3 gap-20 border-1 padding-20">
                    <div className="flex direction-column">
                        <span>Title</span>
                        <input
                            value={values.title}
                            onChange={(e) =>
                                setValues({ ...values, title: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex direction-column">
                        <span>Cooking Time</span>
                        <input
                            value={values.cookTime}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    cookTime: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex direction-column">
                        <span>Preparation Time</span>
                        <input
                            value={values.prepTime}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    prepTime: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex direction-column">
                        <span>Description</span>
                        <textarea
                            value={values.description}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    description: e.target.value,
                                })
                            }
                            placholder="description"
                        />
                    </div>
                    <div className="flex direction-column">
                        <span>No. of Servings</span>
                        <input
                            value={values.servings}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    servings: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="grid grid-column-2 gap-20 margin-top-20">
                    <div className="ingredients-container border-1 padding-20">
                        <div className="flex justify-between">
                            <h3>Ingredients</h3>
                            <div className="flex align-center">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={(e) => addIngredient()}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        <ul className="ingredients">
                            {ingredients.length > 0 ? (
                                ingredients.map((ingredient, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="flex margin-bottom-20">
                                                <div className="flex direction-column">
                                                    <span>Name</span>
                                                    <input
                                                        value={ingredient.name}
                                                        onChange={(e) => {
                                                            let newArr = [
                                                                ...ingredients,
                                                            ];
                                                            newArr[index].name =
                                                                e.target.value;
                                                            setIngredients(
                                                                newArr
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex direction-column">
                                                    <span>Measurement</span>
                                                    <input
                                                        value={
                                                            ingredient.measurement
                                                        }
                                                        onChange={(e) => {
                                                            let newArr = [
                                                                ...ingredients,
                                                            ];
                                                            newArr[
                                                                index
                                                            ].measurement =
                                                                e.target.value;
                                                            setIngredients(
                                                                newArr
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex direction-column">
                                                    <span>Amount</span>
                                                    <input
                                                        value={
                                                            ingredient.amount
                                                        }
                                                        onChange={(e) => {
                                                            let newArr = [
                                                                ...ingredients,
                                                            ];
                                                            newArr[
                                                                index
                                                            ].amount =
                                                                e.target.value;
                                                            setIngredients(
                                                                newArr
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex direction-column justify-center">
                                                    <button
                                                        type="button"
                                                        className="delete"
                                                        onClick={(e) =>
                                                            handleIngredientDelete(
                                                                ingredient
                                                            )
                                                        }
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <div>No Ingredient found</div>
                            )}
                        </ul>
                    </div>

                    <div className="directions-container border-1 padding-20">
                        <div className="flex justify-between">
                            <h3>Directions</h3>
                            <div className="flex align-center">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={(e) => addDirection()}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        <ol className="directions">
                            {directions.length > 0 ? (
                                directions.map((direction, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="flex align-center">
                                                <div className="flex direction-column">
                                                    <span>Instructions</span>
                                                    <textarea
                                                        value={
                                                            direction.instructions
                                                        }
                                                        onChange={(e) => {
                                                            let newArr = [
                                                                ...directions,
                                                            ];
                                                            newArr[
                                                                index
                                                            ].instructions =
                                                                e.target.value;
                                                            setDirections(
                                                                newArr
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex direction-column whitespace-pre">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={
                                                                direction.optional
                                                            }
                                                            defaultChecked={
                                                                direction.optional
                                                            }
                                                            onChange={(e) => {
                                                                let newArr = [
                                                                    ...directions,
                                                                ];
                                                                newArr[
                                                                    index
                                                                ].optional =
                                                                    e.target.checked;
                                                                setDirections(
                                                                    newArr
                                                                );
                                                            }}
                                                        />
                                                        Optional
                                                    </label>
                                                </div>
                                                <div className="flex direction-column justify-center">
                                                    <button
                                                        type="button"
                                                        className="delete"
                                                        onClick={(e) =>
                                                            handleDirectionDelete(
                                                                direction
                                                            )
                                                        }
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <div>No Direction found</div>
                            )}
                        </ol>
                    </div>
                </div>
            </form>
        </div>
    );
}
