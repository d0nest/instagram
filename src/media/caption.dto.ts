import { UserDto } from "src/user/user.dto"

export class CaptionDto{
    created_time: Date
    text: string
    user: UserDto
}