import { IsNotEmpty, IsString } from "class-validator";

class CreatePostDto {
  
    content: string;
    title: string;
    @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];
  }
  export default CreatePostDto;