import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post.model';

export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const selectPost = createAction(
  '[Post] Select Post',
  props<{ postId: number }>()
);

export const loadPostsFailure = createAction('[Post] Load Posts Failure', props<{ error: any }>());

