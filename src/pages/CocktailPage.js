import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

export default function CocktailPage() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail;
    return (
      <section className="section cocktail-section">
        <div className="drink">
          <div>
            <h2 className="section-title">{name}</h2>
            <img src={image} alt={name}></img>

            <Link to="/" className="btn btn-white">
              back home
            </Link>
          </div>

          <div className="drink-info">
            <p>
              name :<span className="drink-data">{name}</span>
            </p>
            <p>
              category :<span className="drink-data"> {category}</span>
            </p>
            <p>
              info :<span className="drink-data">{info}</span>
            </p>
            <p>
              glass :<span className="drink-data"> {glass}</span>
            </p>

            <p>
              ingredients :
              <span>
                {ingredients.map((item, index) => {
                  return item ? (
                    <span className="drink-data" key={index}>
                      {" "}
                      {item}
                    </span>
                  ) : null;
                })}
              </span>
            </p>
            <p>
              instructons :<span> {instructions}</span>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
