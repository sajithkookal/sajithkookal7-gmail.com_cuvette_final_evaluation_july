import React, { useEffect, useState } from "react";
import styles from "./analysis.module.css";
import axios from "axios";
import { backendBaseUrl } from "../../config";
function Analysis({ quizzId }) {
  const [quiz, setQuiz] = useState(null);
  const getData = async () => {
    try {
      const jwToken = localStorage.getItem("jwToken");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": jwToken,
      };
      const quizId = quizzId;
      const response = await axios.get(`${backendBaseUrl}/api/fetch/${quizId}`, {
        headers: headers,
      });
      
      if (response.data.status === "OK") {
        setQuiz(() => response.data.quizData[0]);
      }
    
    } catch (err) {
      console.log(err);
    //  return alert("Something went wrong in getting data");
    }
  };
  useEffect(() => {
    getData();
    
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.caption}>
          <div className={styles.quizName}>
            {quiz ? quiz.quizzName : "loading.."} Qustion Analysis
          </div>
          <div className={styles.details}>
            <div>
              Created on:{" "}
              {quiz
                ? new Date(quiz.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "loading.."}
            </div>
            <div>Impressions: {quiz ? quiz.impressions : "Loading.."}</div>
          </div>
        </div>
        <div className={styles.analyticsContainer}>
          {quiz
            ? quiz.questions.map((ques,index) => (
                <div key={index} className={styles.qContainer}>
                  <div className={styles.question}>{ques.question}</div>
                  {ques && quiz.quizzType === "qna" ? (
                    <div className={styles.stats}>
                      <div>
                        <span
                          style={{
                            fontSize: "2.5rem",
                            fontFamily: "Poppins",
                          }}
                        >
                          {ques ? ques.attempted : "loading.."}
                        </span>{" "}
                        <br />{" "}
                        <span
                          style={{
                            fontSize: "1rem",
                            fontFamily: "Poppins",
                          }}
                        >
                          People Attempted quesion
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "2.5rem",
                            fontFamily: "Poppins",
                          }}
                        >
                          {ques ? ques.correct : "loading.."}
                        </span>{" "}
                        <br />{" "}
                        <span
                          style={{
                            fontSize: "1rem",
                            fontFamily: "Poppins",
                          }}
                        >
                          People answered correctly
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "2.5rem",
                            fontFamily: "Poppins",
                          }}
                        >
                          {ques ? ques.incorrect : "loading.."}
                        </span>{" "}
                        <br />{" "}
                        <span
                          style={{
                            fontSize: "1rem",
                            fontFamily: "Poppins",
                          }}
                        >
                          People answered Incorrectly
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.pollStats}>
                      {ques
                        ? ques.options.map((op, index) => (
                            <div key={index}>
                              <span
                                style={{
                                  fontSize: "2.5rem",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {op.votes}
                              </span>{" "}                           
                              <span
                                style={{
                                  fontSize: "1.2rem",
                                  fontFamily: "Poppins",
                                  marginLeft: "10px",
                                }}
                              >                          
                                {ques.optionType === "txt"
                                  ? op.value
                                  : `option ${index + 1}`}
                              </span>
                            </div>
                          ))
                        : "loading.."}
                    </div>
                  )}
                </div>
              ))
            : "Loading.."}
        </div>
      </div>
    </>
  );
}

export default Analysis;
