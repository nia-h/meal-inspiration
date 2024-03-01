import { useState } from "react";
import { z } from "zod";
import Axios from "axios";
import type { AxiosResponse } from "axios";
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
      <ol className="prose [counter-reset:marker]">
        {instructionsArr.map((instruction, idx) => {
          return (
            // <li className="[counter-increment:marker] before:content-[counter(marker)'.\00a0']" key={idx}>
            <li
              className={` ${!instruction.startsWith("DO AHEAD") && "[counter-increment:marker] before:pr-4 before:content-[counter(marker)'.']"}`}
              key={idx}
            >
              {instruction}
            </li>
          );
        })}
      </ol>
    );
  };

  const ingredsList = ingredsParser(IngredsString);

  const instructions = instructionsFormatter(recipe.Instructions);

  console.log("img name==>", recipe.Image_Name);

  const imageUrl = `https://zzamukgpjikjrxwohqyh.supabase.co/storage/v1/object/public/meal-inspiration-recipe-photos/${recipe.Image_Name}.jpg`;

  return (
    <>
      {/* <li className="relative mt-12 w-full flex-[0_0_auto] rounded bg-neutral_200 between:w-[50%] sm:w-[33%]"> */}
      {/* <img src="/avatar-anisha.png" className="relative mx-auto w-16 translate-y-[-50%]" alt="" /> */}
      {/* -mt-2 &  -translate-y-2 can achieve the same thing */}
      {/* <div className="slider-content mx-auto -mt-8 px-8 py-6 "> */}
      <div className="relative z-30 mt-40 border-4 border-red-500">
        <div
          className="absolute inset-0 -z-10 bg-[length:auto_150%] bg-fixed bg-center bg-no-repeat opacity-70 blur-3xl"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 -z-20 overflow-hidden bg-gray-700 bg-fixed opacity-20"></div>

        <div className="w-[80%] text-white">
          <h3 className="font-bold">{recipe.Title}</h3>
          {/* image storage need to be made private and with auth  https://github.com/orgs/supabase/discussions/13742 */}
          <img
            src={`https://zzamukgpjikjrxwohqyh.supabase.co/storage/v1/object/public/meal-inspiration-recipe-photos/${recipe.Image_Name}.jpg`}
          />

          <div className="pt-6 text-lg">Ingredients:</div>
          <ol className="prose list-disc space-y-3 pl-5 text-slate-500 marker:text-sky-400">
            {ingredsList.map((ingred, idx) => {
              return (
                <li key={idx} className="">
                  {ingred}
                </li>
              );
            })}
          </ol>
          {/* <p className=""> */}
          <div className="pt-6 text-lg">Instructions:</div>
          <p className="mt-4 max-w-[42ch]">{instructions}</p>
        </div>
        {/* </li> */}
      </div>
    </>
  );
};
