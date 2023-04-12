import { IsNotEmpty } from "class-validator"

export class CreatePostDto {
  @IsNotEmpty()
  title: string
  content: string
  description: string
  user: any
  categories: [string]
}

export class UpdatePostDto {
  @IsNotEmpty()
  title: string
  id: string
  content: string
}