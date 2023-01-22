import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataJson, Comment, User } from '../../types/comment.interface';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Input() comment!: Comment;

  @Output() deleteComment = new EventEmitter<number>();
  @Output() updateComment = new EventEmitter();
  @Output() addComment = new EventEmitter<{
    text: string;
    id: number | null;
  }>();

  replyId: number | null = null;
  canReply: boolean = false;
  showReplyForm: boolean = false;
  showEditForm = false;
  showPopup = false;
  commentId = null;
  content = '';

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }
  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
    this.content = this.comment.content;
  }

  incrementScore(comment: Comment) {
    comment.score += 1;
  }
  decrementScore(comment: Comment) {
    comment.score -= 1;
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  onDelete() {
    this.deleteComment.emit(this.comment.id);
    this.showPopup = false;
  }
}
