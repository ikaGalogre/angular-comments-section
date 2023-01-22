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
  showPopup = false;
  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.getComments().subscribe((comments) => {
      this.comments = comments;
    });
  }
  addComment({ text, id }: { text: string; id: null | number }): void {
    console.log(text, id);
    this.commentsService.createComment(text, id).subscribe((createComment) => {
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
  handleUpdateComment(updatedComment: any) {
    this.comments.forEach((comment) => {
      if (comment.id === updatedComment.id) {
        comment.content = updatedComment.text;
      }
    });
  }
  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  // sortComments() {
  //   this.comments.sort((a, b) => b.score - a.score);
  // }
}
