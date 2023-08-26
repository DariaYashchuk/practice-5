import React from "react";
import styles from "./Comment.module.css";
import PropTypes from "prop-types";
import { TiThumbsUp, TiThumbsDown, TiDelete } from "react-icons/ti";
import { AiOutlineSave, AiOutlineEdit } from "react-icons/ai";
import { formatDateToNow } from "../../helpers/formatDateToNow";
import { Button } from "../Button/Button";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "../../redux/commentApi";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";

export const Comment = ({
  createdAt,
  content,
  author,
  avatar,
  thumbsUp,
  thumbsDown,
  id,
}) => {
  const [deleteComment] = useDeleteCommentMutation();
  const [editComment] = useEditCommentMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");

  const handleDeleteComment = async () => {
    try {
      await deleteComment(id);
      toast.success(`Deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = async () => {
    setIsEdit(false);
    try {
      await editComment({ id, content: text });
      toast.success(`Edited successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.card}>
      <img className={styles.avatar} src={avatar} alt={author} />
      <div className={styles.cardWrapper}>
        <div className={styles.cardBody}>
          <h3 className={styles.author}>{author}</h3>
          <p className={styles.content}>
            <span className={styles.blockquote}>"</span>
            {isEdit ? (
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                defaultValue={content}
                onChange={handleChangeText}
              />
            ) : (
              content
            )}
            <span className={styles.blockquote}>"</span>
          </p>
        </div>
        {isEdit ? (
          <div className={styles.editBtn} onClick={handleSave}>
            <AiOutlineSave className={styles.icon} />
          </div>
        ) : (
          <div className={styles.editBtn} onClick={handleEdit}>
            <AiOutlineEdit className={styles.icon} />
          </div>
        )}

        <div className={styles.deleteBtn} onClick={handleDeleteComment}>
          <TiDelete className={styles.icon} />
        </div>

        <Toaster position="top-center" reverseOrder={false} />

        <div className={styles.cardFooter}>
          <span className={styles.date}>{formatDateToNow(createdAt)}</span>

          <div className={styles.buttonBox}>
            <Button counter={thumbsUp} id={id}>
              <TiThumbsUp className={styles.icon} />
            </Button>

            <Button counter={thumbsDown} role="thumbsDown" id={id}>
              <TiThumbsDown className={styles.icon} />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

Comment.propTypes = {
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  thumbsUp: PropTypes.number.isRequired,
  thumbsDown: PropTypes.number.isRequired,
};
