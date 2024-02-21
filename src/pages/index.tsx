import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";

import Link from "next/link";

import Image from "next/image";
import logo from "public/cooking.png";
import { RefObject, useEffect, useRef } from "react";
import Text from "./text";
// import type { MouseEvent } from "react";

import { api } from "~/utils/api";
import A11YSlider from "a11y-slider";

export default function Home() {
  useEffect(() => {
    const existingContainer = document.querySelector(".a11y-slider-container");
    if (existingContainer) return;
    const container = document.querySelector(".slider") as unknown as HTMLElement;

    const slider = new A11YSlider(container, {
      adaptiveHeight: false,
      dots: true,
      centerMode: true,
      arrows: false,
      responsive: {
        // below breakpoints is chosen to account for tailwind breakpoints (unit is em)
        620: {
          //works for chrome; 480 kinda works for safari
          //unit is px
          dots: false,
        },
      },
    });
  }, []);

  // function initSlider(node: HTMLUListElement) {
  //   if (node === null) return;
  //   console.log("node==>", node);

  // const container = node as unknown as HTMLElement;
  // const slider = new A11YSlider(container, {
  //   adaptiveHeight: false,
  //   dots: false,
  //   centerMode: true,
  //   arrows: false,
  //   responsive: {
  //     480: {
  //       dots: false, // dots enabled 1280px and up
  //     },
  //   },
  // });
  //}
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const primaryNavItems: [string, string][] = [];
  primaryNavItems.push(["Pricing", "#"]);
  primaryNavItems.push(["Product", "#"]);
  primaryNavItems.push(["About us", "#"]);
  primaryNavItems.push(["Career", "#"]);
  primaryNavItems.push(["Community", ""]);

  const primaryNavRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLImageElement>(null);
  const iconCloseRef = useRef<HTMLImageElement>(null);

  // const sliderHostRef = useRef<HTMLUListElement>(null);

  const handleMobileNavToggle = (e: React.MouseEvent<Element, MouseEvent>): void => {
    const primaryNav = primaryNavRef.current;
    const header = headerRef.current as HTMLHeadingElement;
    // const hamburger = hamburgerRef.current!;
    // const iconClose = iconCloseRef.current!;

    if (!primaryNav || !header) return;
    if (!e.target) return;
    const primaryNavButton = e.target as HTMLButtonElement;

    // const children = primaryNavButton.childNodes;

    if (primaryNavButton.hasAttribute("data-visible")) {
      //hamburger currently hidden
      primaryNavButton.setAttribute("aria-expanded", "false");
      primaryNavButton.classList.remove("bg-close_icon");
      primaryNavButton.classList.add("bg-hamburger_icon");

      // for (const node of children) {
      //   if ((node as HTMLElement).classList.contains("icon-hamburger")) {
      //     (node as HTMLElement).setAttribute("aria-hidden", "false");
      //     (node as HTMLElement).classList.toggle("hidden");
      //   } else if ((node as HTMLElement).classList.contains("icon-close")) {
      //     (node as HTMLElement).setAttribute("aria-hidden", "true");
      //     (node as HTMLElement).classList.toggle("hidden");
      //   }
      // }
      // hamburger.setAttribute("aria-hidden", "true");
      // iconClose.setAttribute("aria-hidden", "false");
    } else {
      primaryNavButton.setAttribute("aria-expanded", "true");
      primaryNavButton.classList.add("bg-close_icon");
      primaryNavButton.classList.remove("bg-hamburger_icon");
      // for (const node of children) {
      //   if ((node as HTMLElement).classList.contains("icon-hamburger")) {
      //     (node as HTMLElement).setAttribute("aria-hidden", "true");
      //     (node as HTMLElement).classList.toggle("hidden");
      //   } else if ((node as HTMLElement).classList.contains("icon-close")) {
      //     (node as HTMLElement).setAttribute("aria-hidden", "false");
      //     (node as HTMLElement).classList.toggle("hidden");
      //   }
      // }
    }
    primaryNav.classList.toggle("start:hidden");
    // primaryNav.classList.toggle("fixed");
    primaryNavButton.toggleAttribute("data-visible"); // for aria only?
    //below are for overlay; this need to be put on the element and the only thing that need to be toggered is "before: hidden?"
    header.classList.toggle("before:content-['']");
    header.classList.toggle("before:fixed");
    header.classList.toggle("before:inset-0");
    header.classList.toggle("before:bg-gradient-to-b");
    header.classList.toggle("before:from-drop_shadow_start");
    header.classList.toggle("before:to-drop_shadow_end");
    header.classList.toggle("z-50");
    header.classList.toggle("relative");
    // iconClose.classList.toggle("hidden");
    // hamburger.classList.toggle("hidden");
  };

  // const sliderHost = sliderHostRef.current;
  // let slider;
  // if (sliderHost) {
  //   console.log("sliderHost==>", sliderHost);
  // }

  return (
    <>
      <Head>
        <title>Meal Inspiration</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input type="email" className=" border-2 border-lime-400 text-black" />

      <main className="text-sm  text-text_primary_400">
        {/* <header className="primary-header mt-12" ref={headerRef}> */}
        <AuthShowcase />
        <header
          className="primary-header mt-6"
          ref={headerRef}
          // before:fixed before:inset-0 before:bg-pink-300 before:content-['']
        >
          <div className="general-container">
            <div className="nav-wrapper flex items-center justify-between">
              <Link href="/" className="">
                <Image
                  className="h-auto max-w-16"
                  src={logo}
                  alt="MI-logo"
                  // sizes="100vw"

                  // sizes="(max-width: 768px) 10vw, (max-width: 1200px) 8vw, 5vw"
                />
              </Link>
              <button
                onClick={(e) => {
                  handleMobileNavToggle(e);
                }}
                className="mobile-nav-toggle fixed right-4 top-8 aspect-square w-[1.65rem] cursor-pointer    bg-transparent bg-hamburger_icon bg-contain bg-center bg-no-repeat p-[0.5em] sm:hidden"
                aria-controls="primary-navigation"
                aria-expanded="false"
              >
                {/* <img
                  className="icon-hamburger"
                  src="/icon-hamburger.svg"
                  alt=""
                  aria-hidden="false"
                  // ref={hamburgerRef}
                />
                <img
                  className="icon-close hidden"
                  src="/icon-close.svg"
                  alt=""
                  aria-hidden="true"
                  // ref={iconCloseRef}
                /> */}
                <span className="sr-only">Menu</span>
              </button>

              <nav
                // ml-auto will push element to the right (opposite of l)
                className="primary-navigation start:fixed start:inset-x-4 start:top-28 start:mx-auto start:hidden start:max-w-[25rem] start:rounded start:bg-bg_neutral_100 start:p-12 start:shadow-nav"
                id="primary-navigation"
                ref={primaryNavRef}
              >
                <ul
                  aria-label="Primary"
                  role="list"
                  className="nav-ul grid gap-8 text-center text-fs_nav font-bold sm:flex sm:gap-non_mobile_nav_gap sm:font-medium"
                >
                  {/* clamp(): not good for width (due to min value in mobile), good for font sizes */}
                  {primaryNavItems.map((item) => (
                    <li key={item[0]}>
                      <a
                        href={item[1]}
                        className="text-text_primary_400 hover:text-text_accent_400 focus:text-text_accent_400"
                      >
                        {item[0]}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <button className="btn-main btn hidden sm:inline-flex">Daisy Button</button>
              {/* <span className="px-4"></span>
              <button className="kevin-button">Kevin Button</button> */}
            </div>
          </div>
        </header>

        <div className="body">
          <section className="py-20">
            <div className="general-container">
              <div className="even-columns">
                <div className="hero-image before:absolute before:right-0 before:top-0 before:-z-10 before:aspect-[1/1.2] before:max-h-[70vh] before:w-[87%] before:bg-tablet_image before:bg-hero_image_position before:bg-no-repeat before:content-[''] sm:before:w-[45%]">
                  {/* <img src="/pasta.webp" alt="pasta" /> */}
                  <img src="/illustration-intro.svg" className="mx-auto" alt="" />
                </div>
                <div className="sm:-order-1">
                  <h1 className="text-fs_primary_heading font-bold leading-[1.1]">
                    Slogan goes here - Bring every one here to build better products
                  </h1>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit gucimus sapiente praesentium, earum,
                    asperna.
                  </p>
                  <button className="btn-main btn mt-12">Get started</button>
                </div>
              </div>
            </div>
          </section>

          <section className="sales-points relative py-20">
            {/* translate-y-[30%] is a walkaround to compensate position change caused by scale-[40%] */}
            {/* bottom-full: 100% <percentage>s of the height of the containing block  */}
            <div
              className="general-container befor
              [url('/bg-tablet-pattern.svg')] relative before:absolute before:bottom-full before:left-[70%] before:-z-10 before:w-[100px] before:translate-y-[350%] before:scale-[40%]
              before:sm:left-[-30%] before:sm:top-[40%]  before:sm:scale-[70%]
          "
            >
              <div className="even-columns">
                <div className="text-center sm:text-start">
                  <h2 className="text-fs_secondary_heading font-bold leading-[1.1]">smaller title goes here</h2>
                  <p className="mt-[1em] max-w-[32ch] opacity-70 start:mx-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error impedit maxime nisi consequuntur
                    totam porro nihil, rerum fuga odit culpa amet illo eaque laudantium tenetur repellat ratione
                    voluptate voluptas temporibus!
                  </p>
                  <input type="email" className=" border-2 border-lime-400 text-black" />
                </div>
                <ul className="numbered-items me-auto ms-auto w-fit [counter-reset:marker]" role="list">
                  <li className="[counter-increment:marker]">
                    <div className="list-title">
                      <h3 className="col-start-2 col-end-3 row-start-1 row-end-2 font-bold leading-4">
                        One - First Item
                      </h3>
                      <p className="col-start-2 col-end-[-1] mt-[1em] max-w-[42ch] opacity-70 xs:col-start-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias error eveniet illo, voluptate
                        architecto laborum non deleniti eos commodi numquam odit. Culpa ipsa soluta assumenda?
                      </p>
                    </div>
                  </li>
                  <li className="mt-[3em] [counter-increment:marker]">
                    <div className="list-title">
                      <h3 className="col-start-2 col-end-3 row-start-1 row-end-2 font-bold leading-4">
                        Two - Second Item - This sub-title is a very long one
                      </h3>
                      <p className="col-start-2 col-end-[-1] mt-[1em] max-w-[42ch] opacity-70 xs:col-start-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias error eveniet illo, voluptate
                        architecto laborum non deleniti eos commodi numquam odit. Culpa ipsa soluta assumenda?
                      </p>
                    </div>
                  </li>
                  <li className="mt-[3em] [counter-increment:marker]">
                    <div className="list-title">
                      <h3 className="col-start-2 col-end-3 row-start-1 row-end-2 font-bold leading-4">
                        Three - Third Item
                      </h3>
                      <p className="col-start-2 col-end-[-1] mt-[1em] max-w-[42ch] opacity-70 xs:col-start-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias error eveniet illo, voluptate
                        architecto laborum non deleniti eos commodi numquam odit. Culpa ipsa soluta assumenda?
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="py-12 text-center">
            <h2 className=" text-fs_secondary_heading font-bold">carousel Catch phrases goes here</h2>
            <ul
              // ref={(node) => {
              //   if (!node) {
              //     return;
              //   }
              //   initSlider(node);
              // }}

              className="slider flex gap-8 between:scroll-pe-[25px] between:scroll-ps-[25px] sm:scroll-pe-[25px] sm:scroll-ps-[25px]"
            >
              <li className="relative mt-12 w-full flex-[0_0_auto] rounded bg-neutral_200 between:w-[50%] sm:w-[33%]">
                <img src="/avatar-anisha.png" className="relative mx-auto w-16 translate-y-[-50%]" alt="" />
                {/* -mt-2 &  -translate-y-2 can achieve the same thing */}
                <div className="slider-content mx-auto -mt-8 px-8 py-6 ">
                  <h3 className="font-bold">Anisha Li</h3>
                  {/* <p className=""> */}
                  <p className="mt-4 max-w-[42ch]">
                    “Manage has supercharged our team’s workflow. The ability to maintain visibility on larger
                    milestones at all times keeps everyone motivated.”
                  </p>
                </div>
              </li>
              <li className="relative mt-12 w-full flex-[0_0_auto] rounded bg-neutral_200 between:w-[50%] sm:w-[33%]">
                <img src="/avatar-ali.png" className="relative inset-0 mx-auto w-16 translate-y-[-50%]" alt="" />
                <div className="slider-content mx-auto -mt-8 px-8 py-6 ">
                  <h3 className="font-bold">Ali Bravo</h3>
                  <p className="mt-4 max-w-[42ch]">
                    {" "}
                    “We have been able to cancel so many other subscriptions since using Manage. There is no more
                    cross-channel confusion and everyone is much more focused.”
                  </p>
                </div>
              </li>
              <li className="relative mt-12 w-full flex-[0_0_auto] rounded bg-neutral_200 between:w-[50%] sm:w-[33%]">
                <img src="/avatar-richard.png" className="relative inset-0 mx-auto w-16 translate-y-[-50%]" alt="" />

                <div className="slider-content mx-auto -mt-8 px-8 py-6 ">
                  <h3 className="font-bold">Richard Watts</h3>
                  <p className="mt-4 max-w-[42ch]">
                    {" "}
                    “Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop
                    recommending them to everyone I talk to!”
                  </p>
                </div>
              </li>
              <li className="relative mt-12 w-full flex-[0_0_auto] rounded bg-neutral_200 between:w-[50%] sm:w-[33%]">
                <img src="/avatar-shanai.png" className="relative inset-0 mx-auto w-16 translate-y-[-50%]" alt="" />

                <div className="slider-content mx-auto -mt-8 px-8 py-6 ">
                  <h3 className="font-bold">Shanai Gough</h3>
                  <p className="mt-4 max-w-[42ch]">
                    {" "}
                    “Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps
                    the whole team in-sync without being intrusive.”
                  </p>
                </div>
              </li>
            </ul>
            <button className="btn-main btn">Get started</button>
            {/* button needs to be extract using @apply */}
          </section>

          <section className="cta relative isolate mt-20 bg-bg_accent_400 py-20 text-center text-text_neutral_100 before:absolute before:inset-0 before:-z-10 before:bg-cta_image before:bg-cta_image_position before:bg-no-repeat before:opacity-10 before:content-['']">
            {/* <section className="cta relative isolate bg-bg_accent_400 py-20 text-center text-text_neutral_100"> */}
            <div className="general-container">
              <div className="even-columns items-center">
                <div>
                  <p className="text-fs_primary_heading font-bold leading-[1.1] sm:text-left">
                    Call to Action slogan goes here
                  </p>
                  {/* <input className=" text-black" /> */}
                </div>
                <div className="sm:justify-self-end">
                  <button className="btn-main btn bg-bg_accent_100 text-text_accent_400" data-type="inverted">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <footer className="text-text isolate bg-bg_neutral_900 py-12 text-text_accent_100">
          {/* add isolate to above line to conceal the hamburger icon; probably not the optimized way to do it */}
          <div className="general-container">
            <div className="footer-wrapper grid gap-12 sm:grid-flow-col sm:grid-cols-footer_sm">
              {/* <div className="form-&-copyright grid content-between  start:me-auto start:ms-auto sm:order-last"> */}
              <form
                action=""
                className="flex items-start gap-2 border-2  border-lime-400 start:me-auto start:ms-auto sm:order-last"
              >
                <input type="email" className="rounded-full px-8 py-3 text-black sm:w-footer_input" />

                <button className="go-button shadow-none">Go</button>
                {/* <input type="email" className="w-footer_input rounded-full px-8 py-3 text-black" /> */}
                {/* <p className="copyright sm:opcity-70 hidden border-2 border-pink-400 sm:block  sm:text-end">
                  Copyright 2024. All Rights Reserved.{" "}
                </p> */}
              </form>

              {/* </div> */}

              <div className="footer-nav mx-auto start:me-auto start:ms-auto">
                <nav aria-label="Footer-nav" className="footer-nav columns-2 gap-footer_nav_gap">
                  <ul role="list">
                    <li>
                      <a
                        className="text-text_neutral_100 hover:text-text_accent_400 focus:text-text_accent_400"
                        href="#"
                      >
                        Home
                      </a>
                    </li>
                    <li className="mt-[1em]">
                      <a
                        className="text-text_neutral_100 hover:text-text_accent_400 focus:text-text_accent_400"
                        href="#"
                      >
                        Pricing
                      </a>
                    </li>
                    <li className="mt-[1em]">
                      <a
                        className="text-text_neutral_100 hover:text-text_accent_400 focus:text-text_accent_400"
                        href="#"
                      >
                        Products
                      </a>
                    </li>
                    <li className="mt-[1em]">
                      <a
                        className="text-text_neutral_100 hover:text-text_accent_400 focus:text-text_accent_400"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="mt-[1em]">
                      <a
                        className="text-text_neutral_100 hover:text-text_accent_400 focus:text-text_accent_400"
                        href="#"
                      >
                        Careers
                      </a>
                    </li>
                    <li className="mt-[1em]">
                      <a
                        className="text-text_neutral_100 hover:text-text_accent_400 focus:text-text_accent_400"
                        href="#"
                      >
                        Community
                      </a>
                    </li>
                    <li className="mt-[1em]">
                      <a
                        className=" text-text_neutral_100 hover:text-text_accent_400 focus:text-text_accent_400"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="logo-&-socials flex flex-col-reverse items-center gap-12 start:me-auto start:ms-auto sm:order-first sm:flex-col sm:items-start sm:justify-between">
                <Link href="/" className="">
                  <Image
                    className="h-auto max-w-16"
                    src={logo}
                    alt="MI-logo"
                    // sizes="100vw"

                    // sizes="(max-width: 768px) 10vw, (max-width: 1200px) 8vw, 5vw"
                  />
                </Link>
                <nav className="flex items-center">
                  <ul role="list" aria-label="social-links" className="flex gap-8 sm:gap-3">
                    <li>
                      <Link href="#" aria-label="facebook" className="group">
                        <svg className="icon aspect-square w-8 fill-neutral_100 group-hover:fill-accent_400 group-focus:fill-accent_400 sm:w-6 sm:max-w-[none]">
                          {/* sm:max-w-[revert] here is to 'revert' the svg{max-width:100%} in the CSS reset sheet to its default/inital value of 'none'  */}
                          <use xlinkHref="social-icons-sprite.svg#icon-facebook"></use>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" aria-label="youtube" className="group">
                        <svg className="icon aspect-square w-8  fill-neutral_100 group-hover:fill-accent_400 group-focus:fill-accent_400 sm:w-6 sm:max-w-[revert]">
                          <use xlinkHref="social-icons-sprite.svg#icon-youtube"></use>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" aria-label="twitter" className="group">
                        <svg className="icon aspect-square w-8 fill-neutral_100 group-hover:fill-accent_400 group-focus:fill-accent_400 sm:w-6 sm:max-w-[revert]">
                          <use xlinkHref="social-icons-sprite.svg#icon-twitter"></use>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" aria-label="pinterest" className="group">
                        <svg className="icon aspect-square w-8 fill-neutral_100 group-hover:fill-accent_400 group-focus:fill-accent_400 sm:w-6 sm:max-w-[revert]">
                          <use xlinkHref="social-icons-sprite.svg#icon-pinterest"></use>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" aria-label="instagram" className="group">
                        <svg className="icon aspect-square w-8 fill-neutral_100 group-hover:fill-accent_400 group-focus:fill-accent_400 sm:w-6 sm:max-w-[revert]">
                          <use xlinkHref="social-icons-sprite.svg#icon-instagram"></use>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <p className="copyright text-center opacity-70 sm:hidden">Copyright 2024. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/90 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
