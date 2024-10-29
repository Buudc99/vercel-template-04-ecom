"use client";
import {Comment} from "@/types/DetailContent";
import {Icon} from "@iconify/react/dist/iconify.js";
import {Button, Dropdown, Input, MenuProps, Modal, Skeleton} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {FC, useEffect, useState} from "react";
import CommentItem from "./Elements";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {
  setComment,
  setFirstName,
  setLastName,
  setMemorized,
  setReplyComment,
} from "@/stores/Comment";
import {RootState} from "@/stores";
import {DeleteData, PatchData, PostData} from "@/apis";
import {ToastCustom, ToastError, ToastSuccess} from "@/components/toast";
import {setOverlayLoading} from "@/stores/Theme";

type CommentsProps = {
  comments: Comment[];
  entryId: string;

  reload: () => void;
};

const Comments: FC<CommentsProps> = ({comments = [], entryId, reload}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {comment, deleteId, updateId} = useSelector(
    (state: RootState) => state.comment
  );
  const {overlay_loading} = useSelector((state: RootState) => state.theme);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const submitComment = async () => {
    if (
      comment !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      process.env.NEXT_PUBLIC_CONTENT_TYPE &&
      entryId !== ""
    ) {
      dispatch(setOverlayLoading(true));
      const formData = {
        entry_id: Number(entryId),
        content: comment,
        channel_id: `${process.env.NEXT_PUBLIC_CONTENT_TYPE}`,
        metadata: {
          user_id: 0,
          first_name: firstName,
          last_name: lastName,
          avatar: null,
        },
      };
      try {
        const response = await PostData(
          `${process.env.NEXT_PUBLIC_NEST_URL}/comments`,
          formData
        );

        if (response) {
          dispatch(setOverlayLoading(false));
          setLoading(true);
          reload();
        }
        dispatch(setComment(""));
      } catch (error) {
        ToastError({msg: "Something went wrong, please try later."});
      } finally {
        dispatch(setOverlayLoading(false));
      }
    } else {
      ToastCustom({
        is: "blank",
        icon: <Icon icon="ph:info" className="text-blue-600" fontSize={24} />,
        msg: "Write your comment before posting",
      });
    }
  };
  const submitReplyComment = async (
    parentId: number,
    content: string,
    fsName: string,
    lsName: string
  ) => {
    if (
      content !== "" &&
      fsName !== "" &&
      lsName !== "" &&
      parentId &&
      process.env.NEXT_PUBLIC_CONTENT_TYPE &&
      entryId !== ""
    ) {
      dispatch(setOverlayLoading(true));
      const formData = {
        parent_comment_id: Number(parentId),
        entry_id: Number(entryId),
        content: content,
        channel_id: `${process.env.NEXT_PUBLIC_CONTENT_TYPE}`,
        metadata: {
          user_id: 0,
          first_name: fsName,
          last_name: lsName,
          avatar: null,
        },
      };
      try {
        const response = await PostData(
          `${process.env.NEXT_PUBLIC_NEST_URL}/comments`,
          formData
        );

        if (response) {
          dispatch(setOverlayLoading(false));
          setLoading(true);
          reload();
        }
        dispatch(setReplyComment(""));
      } catch (error) {
        ToastError({msg: "Something went wrong, please try later."});
      } finally {
        dispatch(setOverlayLoading(false));
      }
    } else {
      ToastCustom({
        is: "blank",
        icon: <Icon icon="ph:info" className="text-blue-600" fontSize={24} />,
        msg: "Write your comment before posting",
      });
    }
  };
  const deleteComment = async () => {
    dispatch(setOverlayLoading(true));
    if (deleteId) {
      try {
        const response = await DeleteData(
          `${process.env.NEXT_PUBLIC_NEST_URL}/comments/${deleteId}`
        );

        if (response) {
          dispatch(setOverlayLoading(false));
          reload();
          setModalShow(false);
        }
      } catch (error) {
        ToastError({msg: "Something went wrong, please try later."});
      } finally {
        dispatch(setOverlayLoading(false));
      }
    } else {
      ToastCustom({
        is: "blank",
        icon: <Icon icon="ph:info" className="text-blue-600" fontSize={24} />,
        msg: "Comment delete not found",
      });
    }
  };
  const updateComment = async () => {
    if (updateContent !== "" && updateId) {
      const formData = {
        content: updateContent,
      };
      try {
        dispatch(setOverlayLoading(true));
        const response = await PatchData(
          `${process.env.NEXT_PUBLIC_NEST_URL}/comments/${updateId}`,
          formData
        );

        if (response) {
          dispatch(setOverlayLoading(false));
          reload();
          setModalShow(false);
        }
      } catch (error) {
        ToastError({msg: "Something went wrong, please try later."});
      } finally {
        dispatch(setOverlayLoading(false));
      }
    } else {
      ToastCustom({
        is: "blank",
        icon: <Icon icon="ph:info" className="text-blue-600" fontSize={24} />,
        msg: "Write your comment before updating",
      });
    }
  };

  useEffect(() => {
    if (loading) {
      if (comments?.length > 0) {
        setLoading(false);
        return;
      }
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 10000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loading, comments]);

  return (
    <section className="py-24 relative w-full">
      <Modal
        title="Delete Comment"
        open={modalShow}
        onOk={deleteComment}
        okButtonProps={{className: "bg-red-600 hover:!bg-red-600"}}
        onCancel={() => setModalShow(false)}
      >
        <p>You wanna remove this comment?</p>
      </Modal>
      <Modal
        title="Edit Comment"
        okButtonProps={{className: "bg-blue-500 hover:!bg-blue-500"}}
        open={modalShow}
        onOk={updateComment}
        onCancel={() => setModalShow(false)}
      >
        <TextArea
          className="!overflow-hidden w-full py-3 text-gray-500 font-normal !min-h-[3.25rem] !max-h-96 px-5 rounded-lg border border-gray-300 bg-white shadow-[0rem_.0625rem_.125rem_0rem_rgba(16,_24,_40,_0.05)] focus:outline-none  placeholder-gray-400 text-lg leading-relaxed"
          placeholder="Write comments here...."
          onChange={(e) => setUpdateContent(e.target.value)}
          value={updateContent}
        />
      </Modal>
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
          <h2 className="text-gray-900 text-3xl font-bold font-manrope leading-normal">
            {comments && comments?.length > 30
              ? comments?.length + "+"
              : comments?.length}
            &nbsp;Comments
          </h2>
          <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
            <div className="w-full relative flex flex-col justify-between gap-4">
              <div className="flex items-center gap-3">
                <Input
                  className="!overflow-hidden w-full py-3 text-gray-500 font-normal h-10 px-5 rounded-full border border-gray-300 bg-white shadow-[0rem_.0625rem_.125rem_0rem_rgba(16,_24,_40,_0.05)] focus:outline-none  placeholder-gray-400 text-lg leading-relaxed"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your First Name"
                  value={firstName}
                />
                <Input
                  className="!overflow-hidden w-full py-3 text-gray-500 font-normal h-10 px-5 rounded-full border border-gray-300 bg-white shadow-[0rem_.0625rem_.125rem_0rem_rgba(16,_24,_40,_0.05)] focus:outline-none  placeholder-gray-400 text-lg leading-relaxed"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Your Last Name"
                />
              </div>
              <TextArea
                className="!overflow-hidden w-full py-3 text-gray-500 font-normal !min-h-[3.25rem] !max-h-96 px-5 rounded-lg border border-gray-300 bg-white shadow-[0rem_.0625rem_.125rem_0rem_rgba(16,_24,_40,_0.05)] focus:outline-none  placeholder-gray-400 text-lg leading-relaxed"
                placeholder="Write comments here...."
                onChange={(e) => dispatch(setComment(e.target.value))}
                value={comment}
              />
              <Button
                onClick={() => submitComment()}
                disabled={overlay_loading}
                className={clsx(
                  "w-fit h-10 cursor-pointer rounded-full",
                  overlay_loading
                    ? "select-none pointer-events-none"
                    : "select-auto pointer-events-auto"
                )}
                type="default"
                icon={<Icon icon="ph:paper-plane-tilt-fill" fontSize={24} />}
              >
                Send
              </Button>
            </div>
            <div className="w-full flex-col justify-start items-start gap-2 flex">
              {comments?.length > 0 &&
                !loading &&
                comments.map((comment) => (
                  <CommentItem
                    onDelete={() => {
                      setModalShow(true);
                    }}
                    onUpdate={() => {
                      setModalShow(true);
                    }}
                    replyCommentFnc={submitReplyComment}
                    key={comment.id}
                    comment={comment}
                    level={0}
                  />
                ))}
              {loading && (
                <div className="flex flex-col gap-4">
                  {Array.from({length: 3}).map((_, index) => (
                    <Skeleton key={index + "cskel"} round={true} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
