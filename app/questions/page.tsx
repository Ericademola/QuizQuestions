"use client";
import { quizData } from "@/constant";
import { getRequest } from "@/src/axios/requests";
import { isAuthenticated } from "@/src/utils/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

interface IQiuz {
  question: string;
  options: string[];
  answer: string;
}

export default function Questions() {
  const [isShowModel, setIsShowModel] = useState<boolean>(false);
  const [isQuestionModel, setIsQuestionModel] = useState<boolean>(false);
  const [pickedQuiz, setPickedQuiz] = useState<IQiuz>()
  const [isEditQuestion, setIEditQuestion] = useState<boolean>(true);
  const [question, setQuestion] = useState<string>("")
  const [questionOption, setQuestionOption] = useState<string[]>([])
  const [option, setOption] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [questionSubmission, setQuestionSubmission] = useState<{question: string;}>()

  useLayoutEffect(() => {
    const isAuth = isAuthenticated("token");    
    if(!isAuth){
      redirect("/")
    }
  }, []);

  const getQuestion = async () => {
    const response = await getRequest("/questions");
    console.log(response.data);
    
  }

  useEffect(() => {
    
    getQuestion();
  })

  const handleProjectDetails = ({quiz}: {quiz: IQiuz}) => {
    setIsShowModel(true);
    setPickedQuiz(quiz);
  }

  const onDeleteOptions = ({index}: {index: number}) => {
    setOptions((prevOptions) => [
      ...prevOptions.slice(0, index),
      ...prevOptions.slice(index + 1)
    ]);
  };

  const onAddOption = () => {
    // setOption()
  }

  const onAddOptions = (e: {preventDefault: () => void}) => {

    e.preventDefault();
    if (option !== "" && options.length < 5 ) {
      setOptions([...options, option]);
      setOption("");
    }

  }

  const onAddQuestion = (e: {preventDefault: () => void}) => {

    e.preventDefault();
    const submission = {question};
    setQuestionSubmission(submission);
    setIEditQuestion(false);

  }

  const onSubmitQuestion = () => {
    const optionsArray = {options}
    if (options.length >= 3) {
      const question = {...questionSubmission, ...optionsArray}
      console.log(question);
    }
    
  }


  // const AddQuestion = () => {
  //   setIsQuestionModel(true);
  // }

  return (
    <main>
      <div className="p-2 md:p-24">
        <div className="mb-[50px] mt-[25px] ml-[10px] text-[40px] font-extrabold align-center">
          QT
          <span className="text-[20px] font-bold h-full">
            QuestionTime
          </span>
        </div>

        <button 
        className="px-4 py-2 bg-blue-500 text-white rounded mb-[50px]"
        onClick={() => setIsQuestionModel(true)}>
          Add Question
        </button>
        <div className="flex flex-col gap-6">

          {/* { quizData.map((quiz) => 
            <div
            onClick={() => handleProjectDetails({ quiz })}
            >

              <div className="flex justify-between">
                <h4 className="text-[20px] font-medium w-[75%]">{quiz.question}</h4>
                <button className="px-2 py-1 bg-blue-500 text-white rounded ml-1 w-[25%] h-[50px]">Edit question</button>
              </div>
              <div>
                <p>a. {quiz.options[0]}</p>
                <p>b. {quiz.options[1]}</p>
                <p>c. {quiz.options[2]}</p>
                <p>d. {quiz.options[3]}</p>
                <p>e. {quiz.options[4]}</p>
              </div>

            </div>
          )} */}

        </div>

      </div>

      <div className={isShowModel ? 'fixed w-full h-full bg-[#000] bg-opacity-20 top-0 left-0 pt-[5%]' : 'fixed w-full h-full bg-[#000] bg-opacity-20 top-0 left-0 pt-[15%] hidden'}>
        <div className="bg-white rounded-lg shadow-lg p-3 w-[75%] md:w-1/2 m-auto md:px-14 justify-end"
        >

        <div className="w-fit ml-auto">
          <button 
            className="text-[red] font-extrabold px-2 rounded text-[20px]"
            onClick={() => setIsShowModel(false)}>
              x
          </button>
        </div>

          <div className="flex justify-between">
            <h4 className="text-[20px] font-extrabold">{pickedQuiz?.question}</h4>
          </div>
          
          { pickedQuiz?.options.map((option, i) => 
            <div className="flex justify-between mb-2" key={i}>
              <p>{option}</p>
              <button 
              className="text-white font-extrabold px-2 bg-[red] rounded text-[20px]"
              // onClick={() => {onDeleteOptions({ i })}}
              >
                x
              </button>
            </div>
          )}
          <div className="flex justify-between max-md:flex-col max-md:gap-2">
            <button 
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onAddOption}>
              Add options
            </button>
            <button 
            className="px-4 py-2 bg-[red] text-white rounded"
            // onClick={onAddOption}
            >
              Delete Question
            </button>
          </div>
        </div>
      </div>

      <div className={isQuestionModel ? 'fixed w-full h-full bg-[#000] bg-opacity-20 top-0 left-0 pt-[5%]' : 'fixed w-full h-full bg-[#000] bg-opacity-20 top-0 left-0 pt-[15%] hidden'}>
        <div className="bg-white rounded-lg shadow-lg p-3 w-[85%] md:w-1/2 m-auto md:px-14 justify-end">

          <div className="w-fit ml-auto">
            <button 
              className="text-[red] font-extrabold px-2 rounded text-[20px]"
              onClick={() => setIsQuestionModel(false)}>
                x
            </button>
          </div>

          <div className="flex justify-between">
            {isEditQuestion ?
              (
                <form className="flex justify-between align-center w-[90%]" onSubmit={onAddQuestion}>
                  <div className="flex flex-col gap w-full">
                    <label htmlFor="">
                      Question
                    </label>
                    <input type="text" name="question" 
                    value={question}
                    placeholder="Please input your question"
                    className="w-[80%] border-[green] border-2 p-1 rounded outline-none" 
                    onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                  <button
                  type="submit"
                  className="h-fit px-4 py-2 bg-blue-500 text-white rounded"
                  >
                  Add
                  </button>
                </form>
              )
              :
              (
                <>
                <h4 className="text-[20px] font-extrabold">{questionSubmission?.question}</h4>
                <button 
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {setIEditQuestion(true)}}
                >
                  Edit
                </button>
                </>
              )
            }

          </div>

          { 
          questionSubmission?.question !== "" && questionSubmission?.question !== undefined &&
            <div>
              { options.map((option, index) => 
                <div className="flex justify-between mb-2" key={index}>
                  <p>{option}</p>
                  <button 
                  className="text-white font-extrabold px-2 bg-[red] rounded text-[20px]"
                  onClick={() => {onDeleteOptions({ index })}}
                  >
                    x
                  </button>
                </div>
              )}
    
              <div className="flex justify-between mb-2">
                <form className="flex justify-between align-center w-[90%]" onSubmit={onAddOptions}>
                  <div className="flex flex-col gap w-full">
                    <input type="text" name="option" placeholder="Please input question answer options" 
                    onChange={(e) => setOption(e.target.value)}
                    value={option}
                    className="w-[80%] border-[green] border-2 p-1 rounded outline-none" />
                  </div>
                  <button
                  type="submit"
                  className="h-fit px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add
                  </button>
                </form>
              </div>
    
              <button 
              className={`${options.length < 3 ? "opacity-75" : ""} px-4 py-2 bg-blue-500 text-white rounded`}
              onClick={onSubmitQuestion}
              disabled={(options.length < 3)}
              >
                Save Question
              </button>
            </div>
          }

        </div>
      </div>

    </main>

  );
}
