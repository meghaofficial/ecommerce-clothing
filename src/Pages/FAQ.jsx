import { CircleHelp, Minus, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import Footer from "../components/Footer";

const accordionData = [
  {
    title: "What is Material Tailwind?",
    content:
      "Material Tailwind is a framework that enhances Tailwind CSS with additional styles and components.",
  },
  {
    title: "How to use Material Tailwind?",
    content:
      "You can use Material Tailwind by importing its components into your Tailwind CSS project.",
  },
  {
    title: "What can I do with Material Tailwind?",
    content:
      "Material Tailwind allows you to quickly build modern, responsive websites with a focus on design.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div className="mt-16 py-10 px-[200px] mb-10">
        <p className=" font-semibold text-center text-[25px] mb-10">
          Frequently Asked Questions
        </p>
        {accordionData.map((item, index) => (
          <Accordion
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

const Accordion = ({ title, content, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  return (
    <div className="border-b border-slate-200 cursor-pointer">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 text-slate-800"
      >
        <span className="flex items-center gap-2">
          <CircleHelp size={15} />
          {title}
        </span>
        <span className="text-slate-800 transition-transform duration-300">
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div className="pb-5 text-sm text-slate-500">{content}</div>
      </div>
    </div>
  );
};

export default FAQ;
