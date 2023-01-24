import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataJson, Comment, User } from '../../types/comment.interface';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Output() deleteReplyEvent = new EventEmitter<any>();
  @Output() editReplyEvent = new EventEmitter<any>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() updateComment = new EventEmitter();

  @Output() addComment = new EventEmitter<{
    text: string;
    id: number | null;
  }>();

  canReply: boolean = false;
  showReplyForm: boolean = false;
  showEditForm = false;
  showReplyEditForm = false;
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

  updateCommentEmitter(obj: any) {
    this.showEditForm = false;
    this.updateComment.emit(obj);
  }

  deleteReply(id: number) {
    this.deleteReplyEvent.emit({
      mainCommentId: this.comment.id,
      replyId: id,
    });
  }
  toggleReplyEditForm() {
    this.showReplyEditForm = !this.showReplyEditForm;
  }
  editReply(id: number) {
    // this.editReplyEvent.emit({
    //   mainCommentId: this.comment.id,
    //   replyId: id,
    // });
  }
}
