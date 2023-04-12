import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { PostRepository } from '../repositories/post.repository';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts() {
    return this.postRepository.findAll();
  }

  async getPostById(post_id: string) {
    const post = await this.postRepository.findById(post_id);
    if (post) {
      return post;
    }
    throw new PostNotFoundException(post_id);
  }

  async replacePost(post_id: string, data: UpdatePostDto) {
    return this.postRepository.findByIdAndUpdate(post_id, data);
  }

  async createPost(post: CreatePostDto) {
    return this.postRepository.create(post);
  }

  async deletePost(post_id: string) {
    return this.postRepository.deleteOne(post_id);
  }
}
