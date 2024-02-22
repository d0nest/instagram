import { CommentDto } from "src/comment/comment.dto"
import { CaptionDto } from "./caption.dto"
import { UserDto } from "src/user/user.dto"

export class MediaDto{
    attribution: string
    createdTime: Date
    filter: string
    link: string
    type: string
    user: UserDto
    comments: CommentDto[]
}