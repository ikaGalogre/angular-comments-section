import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { DataJson, Comment, User } from '../../types/comment.interface';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input() currentUserId!: string;
  comments: Comment[] = [];

  currentUser: any;
  showPopup = false;
  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.getComments().subscribe((comments) => {
      this.comments = comments;
    });

    this.commentsService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
  c: number = 0;
  addReply({ text, id }: { text: string; id: null | number }) {
    const mainCcomment = this.comments.find((c) => c.id === id);
    if (mainCcomment && id) {
      mainCcomment?.replies.push({
        id: this.c,
        content: text,
        score: 0,
        user: this.currentUser,
        createdAt: new Date().toLocaleString('en-US', {
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
        replies: [],
        replyingTo: 'juliosomo',
      });

      this.commentsService
        .updateCommentToAddReply(id, mainCcomment)
        .subscribe();
      mainCcomment?.replies.sort((a, b) => b.score - a.score);
      this.c++;
    }
  }

  addComment({ text, id }: { text: string; id: null | number }): void {
    const newComment: Comment = {
      id: 0,
      content: text,
      user: this.currentUser,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
      replies: [],
      score: 0,
      replyingTo: '',
    };
    this.commentsService
      .createComment(newComment)
      .subscribe((createComment) => {
        this.comments = [...this.comments, createComment];
        this.comments.sort((a, b) => b.score - a.score);
      });
  }
  deleteComment(commentId: number): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
    });
  }
  handleUpdateComment(id: number, updatedText: string) {}

  // togglePopup() {
  //   this.showPopup = !this.showPopup;
  // }
}
