import React, { useState, useEffect } from "react";

type Option = "A" | "B" | "C" | "D" | "E";
type CategoryCounts = [number, number, number, number];

const App: React.FC = () => {
  const [answers, setAnswers] = useState<Option[]>([]);
  const [correct, setCorrect] = useState<number[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  const [perCategory, setPerCategory] = useState<CategoryCounts>([0, 0, 0, 0]);

  const options: Option[] = ["A", "B", "C", "D", "E"];

  const addAnswer = (option: Option) => {
    if (answers.length > 39) return;
    setAnswers((prevAnswers) => [...prevAnswers, option]);
  };

  const handleCorrect = (index: number) => {
    if (correct.includes(index)) {
      setCorrect(correct.filter((answer) => answer !== index));
    } else {
      setCorrect((prevCorrect) => [...prevCorrect, index]);
    }

    let categoryIndex: number;
    if (!toggle) {
      if (index < 12) {
        categoryIndex = 0;
      } else if (index < 22) {
        categoryIndex = 1;
      } else if (index < 28) {
        categoryIndex = 2;
      } else {
        categoryIndex = 3;
      }
    } else {
      if (index < 10) {
        categoryIndex = 0;
      } else if (index < 20) {
        categoryIndex = 1;
      } else if (index < 30) {
        categoryIndex = 2;
      } else {
        categoryIndex = 3;
      }
    }

    setPerCategory((prevPerCategory: CategoryCounts) => {
      const updatedPerCategory: CategoryCounts = [...prevPerCategory];
      const categoryCount = updatedPerCategory[categoryIndex];

      if (correct.includes(index)) {
        updatedPerCategory[categoryIndex] = categoryCount - 1;
      } else {
        updatedPerCategory[categoryIndex] = categoryCount + 1;
      }
      return updatedPerCategory;
    });
  };

  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div className="bg-[black] min-h-screen">
      <span className="flex flex-row gap-4 justify-center pt-16 text-[#7a7a7a] text-[26px]">
        <button
          className={`${
            !toggle ? "text-[#ffffff] font-bold" : "hover:text-[#cecece] italic"
          }`}
          onClick={() => {
            setToggle(!toggle);
            setAnswers([]);
            setCorrect([]);
            setPerCategory([0, 0, 0, 0]);
          }}
        >
          KVANTITATIV
        </button>
        <button
          className={`${
            toggle ? "text-[#ffffff] font-bold" : "hover:text-[#cecece] italic"
          }`}
          onClick={() => {
            setToggle(!toggle);
            setAnswers([]);
            setCorrect([]);
            setPerCategory([0, 0, 0, 0]);
          }}
        >
          VERBAL
        </button>
      </span>
      <section className="flex flex-row justify-center gap-6 mt-4">
        {options.map((option, index) => (
          <span
            key={index}
            onClick={() => addAnswer(option)}
            className="bg-[#535353] text-[#cecece] border-[4px] border-[transparent] hover:border-[white] cursor-pointer rounded-2xl font-bold px-8 py-4"
          >
            {option}
          </span>
        ))}
      </section>
      <div className="flex justify-center text-[#cecece] text-[18px] italic mt-2">
        <section className="w-[480px] flex justify-between">
          <span
            onClick={() => {
              setAnswers([]);
              setCorrect([]);
              setPerCategory([0, 0, 0, 0]);
            }}
            className="hover:text-[red] cursor-pointer"
          >
            Nollställ
          </span>
          <span className="flex flex-row gap-1">
            Rätt: <p className="font-bold">{correct.length}</p> av{" "}
            <p className="font-bold">{answers.length}</p>
          </span>
        </section>
      </div>
      <div className="flex justify-center gap-4 text-[#cecece] text-[18px] italic mt-2 mb-2">
        <span>
          {toggle
            ? "ORD: " + perCategory[0] + " / 10"
            : "XYZ: " + perCategory[0] + " / 12"}
        </span>
        <span>
          {toggle
            ? "LÄS: " + perCategory[1] + " / 10"
            : "KVA: " + perCategory[1] + " / 10"}
        </span>
        <span>
          {toggle
            ? "MEK: " + perCategory[2] + " / 10"
            : "NOG: " + perCategory[2] + " / 6"}
        </span>
        <span>
          {toggle
            ? "ELF: " + perCategory[3] + " / 10"
            : "DTK: " + perCategory[3] + " / 12"}
        </span>
      </div>
      <section className="max-h-[330px] flex flex-col items-center overflow-y-scroll text-[#cecece] text-[32px]">
        {answers.map((answer, index) => {
          let category = "";
          if (index === 0 && !toggle) category = "📝 XYZ 📝";
          else if (index === 12 && !toggle) category = "🧮 KVA 🧮";
          else if (index === 22 && !toggle) category = "🤔 NOG 🤔";
          else if (index === 28 && !toggle) category = "📈 DTK 📈";

          if (index === 0 && toggle) category = "🔤 ORD 🔤";
          else if (index === 10 && toggle) category = "📖 LÄS 📖";
          else if (index === 20 && toggle) category = "📝 MEK 📝";
          else if (index === 30 && toggle) category = "🌐 ELF 🌐";

          return (
            <div key={index} className="flex flex-col">
              <p className="text-center text-[#cecece] font-bold italic">
                {category}
              </p>
              <div className="w-[340px] flex flex-row justify-between">
                <span className="cursor-pointer">
                  <p className="font-bold">
                    {index + 1}: {answer}
                  </p>
                </span>
                <span>
                  <p
                    onClick={() => handleCorrect(index)}
                    className="cursor-pointer"
                  >
                    {!correct.includes(index) ? "❌" : "✅"}
                  </p>
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default App;
