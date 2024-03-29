import React from "react";
import styles from "./deletequiz.module.css";
import axios from "axios";
import { backendBaseUrl } from "../../config";
export default function DeleteQuiz({ handleDeleteQuiz, quizzId }) {
  const handleDelete = () => {
   
    const quizId = quizzId;
    
    const jwToken = localStorage.getItem("jwToken");
    if (!jwToken) return alert("Your are not logged in");
    const headers = {
      "Content-Type": "application/json",
      "Authorization": jwToken,
    };
    axios
      .delete(`${backendBaseUrl}/api/delete-quizz/${quizId}`, { headers: headers })
      .then((res) => {
        if (res.data.status === "OK") {
          handleDeleteQuiz(false);
          window.location.reload();
          return alert("Quiz Deleted");
        }
      })
      .catch((err) => {
        return alert("Something went wrong");
      });
  };
  return (
    <>
      <div className={styles.container}>
        <h1>
          Are you confirm you <br /> want to delete ?
        </h1>
        <div className={styles.buttons}>
          <button onClick={handleDelete} className={styles.confirm}>
            Confirm Delete
          </button>
          <button
            onClick={() => handleDeleteQuiz(false)}
            className={styles.cancle}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
