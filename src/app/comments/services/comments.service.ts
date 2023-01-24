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
  createComment(body: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(
      'http://localhost:3000/comments',
      body
    );
  }
  deleteComment(id: number): Observable<{}> {
    return this.httpClient.delete(`http://localhost:3000/comments/${id}`);
  }

  updateCommentToAddReply(id: number, body: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(
      `http://localhost:3000/comments/${id}`,
      body
    );
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>('http://localhost:3000/currentUser');
  }
  updateComment(id: number, comment: any) {
    return this.httpClient.put(
      `{http://localhost:3000/comments/${id}}`,
      comment
    );
  }
}
