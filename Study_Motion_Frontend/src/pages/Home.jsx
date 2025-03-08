import React from "react";
import { NavLink } from "react-router-dom";
import { HighlightedText } from "../component/HomePage/HighlightedText";
import { CTAbutton } from "../component/HomePage/CTAbutton";
import banner from "../assets/Images/banner.mp4";
import { CodeBlocks } from "../component/HomePage/CodeBlocks";
import { CardSection } from "../component/HomePage/CardSection";
import { TimeLine } from "../component/HomePage/TimeLine";
import compareWithOther from "../assets/Images/Compare_with_others.svg";
import knowYourProgrss from "../assets/Images/Know_your_progress.svg";
import playYourLessons from "../assets/Images/Plan_your_lessons.png";
import Instructor from "../assets/Images/Instructor.png";
import { Footer } from "../component/Common/Footer";
import { ReviewSection } from "../component/Common/ReviewSection";
export const Home = () => {
  return (
    <>
    
      {/* section 1 */}
      <div id="herosection" className=" w-10/12 max-w-[1000px] mx-auto mt-20 flex flex-col gap-5 items-center">
        {/* become a instructor */}
        <NavLink to={"/signup"}>
          <div className=" font-inter bg-richblack-600 text-richblack-100 px-4 text-xl py-1 rounded-2xl w-fit border-b-2 hover:scale-95 transition-all duration-200 border-r-2">
            Become an Instructor
          </div>
        </NavLink>

        {/* main heading */}
        <h1 className="text-white font-semibold font-inter text-center text-3xl">
          Empower Your Future with
          <HighlightedText>Coding Skills</HighlightedText>
        </h1>
        <p className=" text-richblack-100 font-inter text-center">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        {/* buttons */}
        <div className=" flex gap-5">
          <CTAbutton text={"Learn More"} active={true} link={"/signup"} />
          <CTAbutton text={"Book a Demo"} active={false} link={"/login"} />
        </div>

        {/* video and gradient */}
        <div className="relative w-[90%] h-[400px] gradient">
          <video
            className="videoshadow mx-auto mt-12"
            autoPlay
            loop
            muted
            src={banner}
          />
        </div>

        {/* first code block */}
        <div>
          <CodeBlocks
            heading={
              <div>
                Unlock your <HighlightedText>coding potential</HighlightedText>{" "}
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            position={`flex-row`}
            button1={{
              text: "Try it Yourself",
              active: true,
              link: "/signup",
            }}
            button2={{
              text: "Learn More",
              active: false,
              link: "/login",
            }}
            codetext={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codecolor={"text-yellow-200"}
          />

          {/* second code block */}
          <CodeBlocks
            heading={
              <div>
                Start <HighlightedText>coding in seconds</HighlightedText>
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            position={`flex-row-reverse`}
            button1={{
              text: "Continue Lesson",
              active: true,
              link: "/login",
            }}
            button2={{
              text: "Learn More",
              active: false,
              link: "/login",
            }}
            codetext={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codecolor={"text-pink-300"}
          />
        </div>

        {/* card section */}
        <CardSection />
      </div>

      {/* section 2 */}
      <div className="w-full bg-white h-[300px] bg-[url('src/assets/Images/bghome.svg')] flex items-center ">
        <div className=" flex mt-36 mx-auto gap-10">
          <CTAbutton
            text={"Explore Full Catalog"}
            active={true}
            link={"/signup"}
          />
          <CTAbutton text={"Learn More"} active={false} link={"/login"} />
        </div>
      </div>

      {/* section 3 */}
      <div className=" w-full bg-white flex flex-col items-center justify-center">
        <div className="my-20 flex justify-between gap-20 w-10/12 max-w-[1000px]">
          <div className=" text-3xl">
            Get the skills you need for a{" "}
            <HighlightedText>that is in demand.</HighlightedText>
          </div>
          <div className=" flex flex-col gap-5 ">
            <p>
              The modern StudyMotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
            <CTAbutton text={"Learn More"} active={true} link={"/login"} />
          </div>
        </div>
        <TimeLine />
      </div>

      {/* section 4 */}
      <div className=" w-full bg-white">
        <div className=" mx-auto flex flex-col my-20 w-10/12 max-w-[1000px] items-center text-center">
          {/* heading and subheading */}
          <div>
            <div className=" text-3xl">
              Your swiss knife for{" "}
              <HighlightedText>learning any language</HighlightedText>
            </div>
            <p className=" w-[80%] mx-auto">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </p>
          </div>
        </div>
        {/* cards */}
        <div className="relative my-10 flex flex-wrap justify-between w-11/12 mx-auto">
          <img width={325} src={knowYourProgrss} />
          <img width={325} src={compareWithOther} />
          <img width={325} src={playYourLessons} />
        </div>
        <div className="w-full flex justify-center my-10">
          <CTAbutton active={true} text={"Learn More"} link={"/login"} />
        </div>
      </div>

      {/* section 5 */}
      <div className=" mx-auto w-10/12 max-w-[1200px] flex flex-col gap-20   my-20">
        {/* section 1 */}
        <div className="flex items-center justify-between">
          {/* left section */}
          <img width={400} src={Instructor} />

          {/* right section */}
          <div className=" flex flex-col w-[400px] gap-5">
            <div className=" text-3xl text-white">
              Become an <HighlightedText>instructor</HighlightedText>
            </div>
            <p className=" text-richblack-100 text-sm">
              Instructors from around the world teach millions of students on
              StudyMotion. We provide the tools and skills to teach what you
              love.
            </p>
            <CTAbutton
              link={"/signup"}
              text={"Start Teaching Today"}
              active={true}
            />
          </div>
        </div>
      </div>

      <ReviewSection/>
      <Footer/>
    </>
  );
};
