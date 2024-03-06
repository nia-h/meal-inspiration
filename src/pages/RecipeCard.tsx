import { useState, useEffect } from "react";
import { z } from "zod";
import Axios from "axios";
import type { AxiosResponse } from "axios";
// import ReactMarkdown from "react-markdown";
import router, { useRouter } from "next/router";

import { type RouterOutputs } from "../utils/api";
import Image from "next/image";
import { GetServerSideProps, GetStaticProps } from "next";
import { api } from "~/utils/api";

export type Recipe = RouterOutputs["recipe"]["getIdeas"][0];

export const getServerSideProps = (async (context) => {
  console.log("context.query.data========================>", context.query.data);
  if (context.query.data === undefined || Array.isArray(context.query.data)) return { props: { mainIngreds: [] } };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const mainIngreds = JSON.parse(context.query.data);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { props: { mainIngreds } };
}) satisfies GetServerSideProps<{ mainIngreds: string[] }>;

export default function RecipeCard({ mainIngreds }: { mainIngreds: string[] }) {
  // useEffect(() => {
  //   void router.replace(`RecipeCard?data=${encodeURIComponent(JSON.stringify(mainIngreds))}`, "/nia", {
  //     shallow: true,
  //   });
  // }, []);
  // useEffect(() => {
  //   router.beforePopState(({ url, as, options }) => {
  //     // I only want to allow these two routes!
  //     // if (as !== "/" && as !== "/other") {
  //     //   // Have SSR render bad routes as a 404.
  //     //   window.location.href = as;
  //     //   return false;
  //     // }
  //     console.log("$$$$$$$$$$$$$$$$$$$$$$url=>", url);
  //     console.log("$$$$$$$$$$$$$$$as=>", as);
  //     console.log("$$$$$$$$$$$$$$$$$options=>", options);

  //     return true;
  //   });
  // }, [router]);
  // const [recipe, setRecipe] = useState<Recipe | null>(null);

  // const { data, refetch: getIdesRefetch } = api.recipe.getIdeas.useQuery(mainIngreds, { enabled: true });
  const recipes = api.recipe.getIdeas.useQuery(mainIngreds, { enabled: true });
  if (!recipes.data?.[0]) return;

  const recipe = recipes.data[0];

  if (!recipe) return;

  // setRecipe(recipeAt0);

  // export default function RecipeCard({ recipe, onDelete }: { recipe: Recipe; onDelete: () => void }) {
  // const router = useRouter();
  // console.log("router==>", router);
  let IngredsString;
  if (recipe) {
    IngredsString = recipe.Ingredients;
  }
  const instructionsSchema = z.array(z.string());
  if (!IngredsString) return;

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

  //needs to complete uploading pics

  //also do a pic existance check

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
          <Image src={imageUrl} alt={`Picture of ${recipe.Title}`} width={500} height={500} priority />;
          {/* <img src={imageUrl} alt={`Picture of ${recipe.Title}`} width={500} height={500} />; */}
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
}
