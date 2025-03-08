import React from "react";
import { HighlightedText } from "../component/HomePage/HighlightedText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import { StatsComponent } from "../component/About_Page/StatsComponent";
import { LearningGrid } from "../component/About_Page/LearningGrid";
import { ContactFormSection } from "../component/About_Page/ContactFormSection";
import { Footer } from "../component/Common/Footer";
import { ReviewSection } from "../component/Common/ReviewSection";

export const About = () => {
  return (
    <>
      {/* Section 1 */}
      <section>
        <div className=" w-full bg-richblack-700 pt-28 pb-56 font-inter">
          <div className=" mx-auto w-10/12 max-w-[700px] font-inter flex flex-col items-center gap-5">
            <h1 className=" text-white text-3xl text-center font-semibold">
              Driving Innovation in Online Education for a
              <HighlightedText>Brighter Future</HighlightedText>
            </h1>
            <p className=" text-richblack-100 text-center">
              Studymotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mt-44 mb-20 relative flex justify-center font-inter">
        
        {/* First Section */}
        <div className="absolute -top-80">
          <div className=" flex w-full max-w-[1000px] gap-5 mx-auto flex-wrap">
            <div className="w-[320px] aspect-square">
              <img src={aboutus1} />
            </div>
            <div className="w-[320px] aspect-square">
              <img src={aboutus2} />
            </div>
            <div className="w-[320px] aspect-square">
              <img src={aboutus3} />
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className=" text-3xl text-richblack-100 font-semibold max-w-[1000px] mx-auto text-center">
          " We are passionate about revolutionizing the way we learn. Our
          innovative platform
          <HighlightedText>combines technology</HighlightedText>
          <span className="orangegradient"> expertise</span>, and community to
          create an
          <span className="yellowgradient">
            {" "}
            unparalleled educational experience.{" "}
          </span>
          "
        </div>
      </section>

      {/* Section 3 */}
      <section className="my-20 gap-20 w-full flex flex-col items-center font-inter">
        
        {/* Left Section */}
        <div className=" w-10/12 max-w-[1000px] flex gap-20 items-center">
          {/* Left Section */}
          <div className=" flex flex-col gap-2 w-full">
            <div className="redgradient text-3xl font-semibold">
              Our Founding Story
            </div>
            <p className=" text-richblack-100 text-sm">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className=" text-richblack-100 text-sm">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>

          {/* Right Section */}
          <img width={400} className="pinkshadow" src={FoundingStory} />
        </div>

        {/* Right Section */}
        <div className="w-10/12 max-w-[1000px] flex gap-20 items-center">
          <div className=" flex flex-col gap-2 w-full">
            <div className="yellowgradient text-3xl font-semibold">
              Our Vision
            </div>
            <p className=" text-richblack-100 text-sm">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className=" flex flex-col gap-2 w-full">
            <div className=" text-3xl font-semibold">
              <HighlightedText>Our Mission</HighlightedText>
            </div>
            <p className=" text-richblack-100 text-sm">
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section>
      <StatsComponent/>
      </section>

      {/* Section 5 */}
      <section>
        <LearningGrid/>
      </section>

      {/* Section 6 */}
      <section>
      <ContactFormSection 
      heading={"Get in Touch"}
      subheading={"We’d love to here for you, Please fill out this form."}
      />
      </section>

      {/* Section 7 */}
      <ReviewSection/>
      <Footer/>
    </>
  );
};
