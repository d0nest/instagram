import { MediaDto } from "src/media/media.dto"
import { UserDto } from "src/user/user.dto"
import { UserEntity } from "src/user/user.entities/user.entity"

export class CommentDto{
    comment: string
    createdTime: Date
    user: UserDto
    media: MediaDto
}

// Create a comment on a media object with the following rules:

// The total length of the comment cannot exceed 300 characters.
// The comment cannot contain more than 4 hashtags.
// The comment cannot contain more than 1 URL.
// The comment cannot consist of all capital letters.