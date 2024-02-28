import { useState } from "react";
import { z } from "zod";

// import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "../utils/api";

export type Recipe = RouterOutputs["recipe"]["getIdeas"][0];

export const RecipeCard = ({ recipe, onDelete }: { recipe: Recipe; onDelete: () => void }) => {
  const IngredsString = recipe.Ingredients;
  const instructionsSchema = z.array(z.string());
  if (IngredsString === null) return;

  // const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const ingredsParser = (ingreds: string) => {
    const ingredsSchema = z.array(z.string());

    const regex1 = /(?<=[0-9])"/g;
    const regex2 = /', '/g;
    const regex3 = /\['/g;
    const regex4 = /\']/g;
    return ingredsSchema.parse(
      JSON.parse(ingreds.replace(regex1, "^inch^").replace(regex2, '", "').replace(regex3, '["').replace(regex4, '"]')),
    );
  };

  const instructionsFormatter = (instructions: string | null) => {
    if (!instructions) return;
    const instructionsArr = instructions.split("\n");
    return (
      <ol className="prose">
        {instructionsArr.map((instruction, idx) => {
          return (
            <li className="instruction [counter-increment:marker]" key={idx}>
              {instruction}
            </li>
          );
        })}
      </ol>
    );
  };

  const ingredsList = ingredsParser(IngredsString);

  const instructions = instructionsFormatter(recipe.Instructions);

  return (
    <>
      {/* <li className="relative mt-12 w-full flex-[0_0_auto] rounded bg-neutral_200 between:w-[50%] sm:w-[33%]"> */}
      {/* <img src="/avatar-anisha.png" className="relative mx-auto w-16 translate-y-[-50%]" alt="" /> */}
      {/* -mt-2 &  -translate-y-2 can achieve the same thing */}
      {/* <div className="slider-content mx-auto -mt-8 px-8 py-6 "> */}
      <div>
        <h3 className="font-bold">{recipe.Title}</h3>
        <ol className="[counter-reset:marker]">
          {ingredsList.map((ingred, idx) => {
            return (
              <li key={idx} className="">
                {ingred}
              </li>
            );
          })}
        </ol>
        {/* <p className=""> */}
        <p className="mt-4 max-w-[42ch]">{instructions}</p>
      </div>
      {/* </li> */}
    </>
  );
};
