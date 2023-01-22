import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataJson, Comment, User } from '../types/comment.interface';

@Injectable()
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>('http://localhost:3000/comments');
  }
  createComment(text: string, id: null | number): Observable<Comment> {
    return this.httpClient.post<Comment>('http://localhost:3000/comments', {
      content: text,
      id,
      user: {
        image: {
          png: './images/avatars/image-juliusomo.png',
          webp: './images/avatars/image-juliusomo.webp',
        },
        username: 'juliusomo',
      },
      createdAt: new Date().toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    });
  }
  deleteComment(id: number): Observable<{}> {
    return this.httpClient.delete(`http://localhost:3000/comments/${id}`);
  }
}
