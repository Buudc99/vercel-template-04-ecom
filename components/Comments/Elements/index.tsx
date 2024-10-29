"use client";
import {setDeleteComment, setUpdateComment} from "@/stores/Comment";
import {Comment} from "@/types/DetailContent";
import {TimeAgo} from "@/utilities/DateConvert";
import {AvatarWithName} from "@/utilities/Image";
import {Icon} from "@iconify/react/dist/iconify.js";
import {Avatar, Button, Dropdown, Input} from "antd";
import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";

type ParentCommentProps = {
  comment: Comment;
  level: number;
  replyCommentFnc: (
    parentId: number,
    content: string,
    fsName: string,
    lsName: string
  ) => void;
  onDelete: () => void;
  onUpdate: () => void;
  className?: string;
};

const CommentItem: FC<ParentCommentProps> = ({
  comment,
  level,
  replyCommentFnc,
  className,
  onUpdate,
  onDelete,
}) => {
  const [showChild, setShowChild] = useState<number | null>(null);
  const [reply, setReply] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();

  return (
    <div
      style={{
        paddingLeft: `${level > 0 ? level + 0.5 : level}rem`,
      }}
      className={`${className} w-full flex-col animate-in fade-in-70 zoom-in-90 overflow-hidden duration-1000 justify-start items-end flex ${comment ? "opacity-100 select-auto pointer-events-auto visible" : "opacity-0 select-none pointer-events-none invisible"}`}
    >
      <div
        style={{
          backgroundColor:
            level > 0 ? `rgba(210, 210, 210, ${0.01 * level})` : "white",
        }}
        className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-4 flex"
      >
        <div className="w-full flex-col justify-center items-start gap-3.5 flex">
          <div className="w-full justify-between items-center inline-flex">
            <div className="justify-start items-center gap-2.5 flex">
              <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                <Avatar
                  src={`${
                    JSON.parse(comment?.meta_data).avatar ||
                    AvatarWithName(
                      JSON.parse(comment?.meta_data).first_name,
                      JSON.parse(comment?.meta_data).last_name
                    )
                  }`}
                  className="h-full w-full"
                />
              </div>
              <div className="flex-col justify-start items-start gap-1 inline-flex">
                <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                  {JSON.parse(comment?.meta_data).first_name +
                    " " +
                    JSON.parse(comment?.meta_data).last_name}
                </h5>
                <h6 className="text-gray-500 text-xs font-normal leading-5">
                  {comment?.created_at && TimeAgo(comment.created_at)}
                </h6>
              </div>
            </div>
            <div className="w-6 h-6 relative">
              <div className="w-full h-fit flex">
                <div className="relative w-full">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: (
                            <Button
                              type="text"
                              onClick={() => onUpdate()}
                              className="hover:!bg-transparent cursor-pointer"
                            >
                              <Icon icon="ph:pen" fontSize={16} /> Edit Comment
                            </Button>
                          ),
                          key: "0",
                        },
                        {
                          label: (
                            <Button
                              type="text"
                              onClick={() => onDelete()}
                              className="text-red-600 hover:!text-red-600 hover:!bg-transparent cursor-pointer"
                            >
                              <Icon icon="ph:x-circle" fontSize={16} /> Delete
                              Comment
                            </Button>
                          ),
                          key: "1",
                        },
                      ],
                    }}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <div>
                      <Icon
                        icon="ph:dots-three-outline-vertical-fill"
                        fontSize={16}
                        onClick={() => {
                          dispatch(setUpdateComment(comment.id));
                          dispatch(setDeleteComment(comment.id));
                        }}
                      />
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-800 text-sm font-normal leading-snug">
            {comment?.content || ""}
          </p>
        </div>
        <div className="w-full justify-between items-center inline-flex">
          <div className="justify-start items-start gap-4 flex flex-col w-full">
            <div className="w-full flex items-center justify-between">
              <div
                onClick={() =>
                  setShowChild((prev) =>
                    prev === null ? Number(comment.id) : null
                  )
                }
                className="justify-start items-center gap-1.5 flex cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-full transition-all duration-500"
              >
                <Icon icon="ph:chat-teardrop-dots" fontSize={24} />
                <h5 className="text-gray-900 text-sm font-normal leading-snug select-none text-nowrap">
                  {comment?.replies?.length > 0
                    ? `${comment?.replies?.length} Replies`
                    : "Reply"}
                </h5>
              </div>
              {/* <div
                onClick={() =>
                  setWriteComment((prev) =>
                    prev === null ? Number(comment.id) : null
                  )
                }
                className="justify-start items-center gap-1.5 flex cursor-pointer px-3 py-2 rounded-full transition-all duration-500"
              >
                <Icon icon="ph:chats" fontSize={24} />
              </div> */}
            </div>
            <div
              className={`items-start gap-3 overflow-hidden flex-col flex w-full ${showChild ? "h-fit select-auto pointer-events-auto visible opacity-100 scale-100" : "h-0 invisible select-none pointer-events-none opacity-0 scale-90"} overflow-hidden transition-all duration-1000`}
            >
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3">
                  <Input
                    className={`h-10 rounded-full`}
                    placeholder="Your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    className={`h-10 rounded-full`}
                    placeholder="Your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <Input
                  className={`h-10 rounded-full`}
                  placeholder="Write reply comment here"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </div>
              <Button
                className="min-w-32 h-10 cursor-pointer rounded-full"
                type="default"
                icon={<Icon icon="ph:paper-plane-tilt-fill" fontSize={24} />}
                onClick={() =>
                  replyCommentFnc(
                    Number(comment.id),
                    reply,
                    firstName,
                    lastName
                  )
                }
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-disabled={showChild !== Number(comment.id)}
        className={`w-full border-l border-gray-100 ${showChild === Number(comment.id) ? "opacity-100 pointer-events-auto select-auto visible h-fit" : "opacity-0 pointer-events-none select-none invisible h-0"} transition-all duration-500`}
      >
        {level < 2 && comment.replies.length > 0 && (
          <>
            {comment.replies.map((reply) => {
              return (
                <CommentItem
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  replyCommentFnc={replyCommentFnc}
                  key={reply.id}
                  comment={reply}
                  level={level + 1}
                  className="mt-3"
                />
              );
            })}
          </>
        )}
        {level == 2 && comment.replies.length > 0 && (
          <>
            {comment.replies.map((reply) => {
              return (
                <CommentItem
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  replyCommentFnc={replyCommentFnc}
                  key={reply.id}
                  comment={reply}
                  level={2}
                  className="mt-3"
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
