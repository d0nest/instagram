import { CountDocumentsOptions } from "typeorm"
import { CountDto } from "./count.dto"
import { CommentDto } from "src/comment/comment.dto"
import { MediaDto } from "src/media/media.dto"

export class UserDto{
        bio: string
        counts: CountDto
        fullname: string
        id: string
        profilePicture: string
        username: string
        password: string
        website: string
}